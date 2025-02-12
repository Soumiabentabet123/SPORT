import { useState } from "react";

const ParticipantsTable = ({ participants }) => {
  const [filter, setFilter] = useState("");

  const filteredParticipants = participants.filter((p) =>
    `${p.Nom} ${p.Prénom}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un participant..."
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Numéro</th>
            <th>Temps</th>
            <th>Classement</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((p) => (
            <tr key={p._id}>
              <td>{p.Nom}</td>
              <td>{p.Prénom}</td>
              <td>{p.Sexe}</td>
              <td>{p.Numéro}</td>
              <td>{p.Temps}</td>
              <td>{p.Classement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;