import React from 'react';

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>{new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
