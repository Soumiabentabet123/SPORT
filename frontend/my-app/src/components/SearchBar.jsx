const SearchBar = ({ setSearchTerm }) => {
    return (
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
    );
  };
  
  export default SearchBar;