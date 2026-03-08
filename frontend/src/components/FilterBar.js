function FilterBar({ filters, setFilters }) {
  return (

    <div className="flex justify-center gap-4">

      <input
        type="text"
        placeholder="Search issue..."
        value={filters.search}
        onChange={e => setFilters({ ...filters, search: e.target.value })}
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500 w-64"
      />

      <select
        value={filters.status}
        onChange={e => setFilters({ ...filters, status: e.target.value })}
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

    </div>

  );
}


export default FilterBar;