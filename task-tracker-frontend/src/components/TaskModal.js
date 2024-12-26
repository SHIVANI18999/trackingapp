import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskModal({ open, onClose, task }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      axios.patch(`http://localhost:5000/api/tasks/${task._id}`, formData)
        .then(res => {
          onClose();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5000/api/tasks', formData)
        .then(res => {
          onClose();
        })
        .catch(err => console.error(err));
    }
  };

  return open ? (
    <div>
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}

export default TaskModal;
