import React from 'react';

function TaskFilter({ setFilter }) {
  return (
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
}

export default TaskFilter;
