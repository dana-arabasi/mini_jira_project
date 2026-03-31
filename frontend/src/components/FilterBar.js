function FilterBar({ filters, setFilters }) {
  return (

    <div className="flex justify-center gap-4 flex-wrap">

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
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority}
        onChange={e => setFilters({ ...filters, priority: e.target.value })}
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filters.sort_by}
        onChange={e => setFilters({ ...filters, sort_by: e.target.value })}
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
      >
        <option value="id">Sort: ID</option>
        <option value="title">Sort: Title</option>
        <option value="priority">Sort: Priority</option>
        <option value="created_at">Sort: Created</option>
        <option value="updated_at">Sort: Updated</option>
      </select>


      <select
        value={filters.order}
        onChange={e => setFilters({ ...filters, order: e.target.value })}
        className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

    </div>

  );
}


export default FilterBar;