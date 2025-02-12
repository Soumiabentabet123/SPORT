import { Link } from "react-router-dom";

const header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Mon Site de Courses</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-500">Événements</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-500">Courses</Link>
            </li>
            <li>
              <Link to="/stats" className="hover:text-blue-500">Résultats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default header;