import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import TaskFilter from './components/TaskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, [filter]);

  // Handle task addition
  const handleAddTask = () => {
    setCurrentTask(null);
    setModalOpen(true);
  };

  // Handle task editing
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <TaskFilter setFilter={setFilter} />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={currentTask} />
    </div>
  );
}

export default App;
