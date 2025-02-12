const Filters = ({ setFilters }) => {
    return (
      <div className="flex space-x-4 mb-6">
        <select
          onChange={(e) => setFilters((prev) => ({ ...prev, distance: e.target.value }))}
          className="p-2 border rounded"
        >
          <option value="">Toutes les distances</option>
          <option value="10">10km</option>
          <option value="21">21km</option>
          <option value="42">42km</option>
        </select>
        <select
          onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
          className="p-2 border rounded"
        >
          <option value="">Tous les types</option>
          <option value="Course à pied">Course à pied</option>
          <option value="Marche">Marche</option>
        </select>
      </div>
    );
  };
  
  export default Filters;