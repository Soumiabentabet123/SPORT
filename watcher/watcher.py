
import os
import time
import pandas as pd
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from pymongo import MongoClient
import chardet  # Import chardet for enimport logging

# 🔗 Connexion à MongoDB (ex. MongoDB Atlas)
client = MongoClient(
    "mongodb+srv://hajarnajam:hajarhajar123@sitesportif.fpfdh.mongodb.net/sports_data?retryWrites=true&w=majority&appName=SiteSportif"
)

db = client["SiteSportif"]      # Nom de ta base de données
collection = db["results"]      # Nom de ta collection

# 📂 Dossiers à utiliser
INCOMING = r"C:\Users\hajar\OneDrive\Desktop\tech\watcher\INCOMING"
PROCESSED = r"C:\Users\hajar\OneDrive\Desktop\tech\watcher\PROCESSED"
CSV = r"C:\Users\hajar\OneDrive\Desktop\tech\watcher\CSV"   
class FileHandler(FileSystemEventHandler):
    def on_created(self, event):
        # On ne traite que les fichiers .txt
        if event.is_directory or not event.src_path.endswith(".txt"):
            return
        
        print(f"📂 Nouveau fichier détecté : {event.src_path}")
        process_txt_file(event.src_path)

def process_txt_file(file_path):
    try:
        # Extraire le nom du fichier sans son extension
        file_name = os.path.basename(file_path)
        csv_filename = os.path.splitext(file_name)[0] + ".csv"
        csv_filepath = os.path.join(CSV, csv_filename)

        # Vérifier si le fichier CSV existe déjà dans le dossier CSV
        if os.path.exists(csv_filepath):
            print(f"⚠ Le fichier {csv_filename} existe déjà dans le dossier CSV. Aucun ajout effectué.")
            return  # Si le fichier CSV existe, ne pas insérer les données

        # Détecter l'encodage du fichier
        with open(file_path, 'rb') as f:
            raw_data = f.read()
            result = chardet.detect(raw_data)
            encoding = result['encoding']
            print(f"📄 Encodage détecté : {encoding}")

        # 📄 Lecture du fichier .txt avec l'encodage détecté
        df = pd.read_csv(file_path, delimiter='\t', engine='python', header=0, dtype=str, encoding=encoding, skipinitialspace=True, keep_default_na=False, na_filter=False)
        
        # Affichage d'un aperçu pour vérification
        print("Aperçu des données extraites :")
        print(df.head())
        
        # Conversion du DataFrame en liste de dictionnaires
        data = df.to_dict(orient="records")
        
        # Ajout du nom du fichier dans chaque enregistrement pour ne pas traiter à nouveau le même fichier
        for record in data:
            record["file_name"] = file_name  # Ajouter le nom du fichier dans chaque enregistrement
        
        # Insertion dans MongoDB
        if data:
            collection.insert_many(data)
            print(f"✅ {len(data)} enregistrements insérés dans MongoDB.")
        else:
            print("⚠ Aucun enregistrement trouvé dans le fichier.")
        
        # Conversion en CSV et sauvegarde
        if not os.path.exists(CSV):
            os.makedirs(CSV)
        df.to_csv(csv_filepath, index=False)
        print(f"✅ Fichier converti en CSV : {csv_filepath}")
        
        # Déplacement du fichier original dans le dossier d'archive
        if not os.path.exists(PROCESSED):
            os.makedirs(PROCESSED)
        archive_filepath = os.path.join(PROCESSED, file_name)
        os.rename(file_path, archive_filepath)
        print(f"📁 Fichier original déplacé vers : {archive_filepath}")

    except Exception as e:
        print(f"❌ Erreur lors du traitement de {file_path} : {e}")

if __name__ == "__main__":
    # Configuration du watcher
    event_handler = FileHandler()
    observer = Observer()
    observer.schedule(event_handler, INCOMING, recursive=False)
    
    print(f"🚀 Surveillance du dossier : {INCOMING}")
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    
    observer.join()
