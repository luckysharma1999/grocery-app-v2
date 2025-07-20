const SearchBar = ({ onSearch, searchTerm }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search items..."
      className="w-full p-2 mb-6 bg-slate-200 rounded-4xl focus:outline-none focus:ring"
    />
  );
};

export default SearchBar;
