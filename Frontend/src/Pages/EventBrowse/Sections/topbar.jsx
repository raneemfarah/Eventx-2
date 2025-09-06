import React from "react";

const Topbar = ({ search, setSearch, dateFilter, setDateFilter, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search events..."
        className="flex-1 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="none">Sort by</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default Topbar;
