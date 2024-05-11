import React, { useState } from 'react';


const AddTaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      status: ''
    });
  };

  return (
    /*<div className="flex flex-row items-stretch justify-around">*/
    <div className="grid grid-cols-6 gap-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleChange}
        className="border border-gray-400 px-2 py-0 rounded md"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={newTask.description}
        onChange={handleChange}
        rows={3}
        className="border border-gray-400 px-2 py-0 rounded mr-2"
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleChange}
        className="border border-gray-400 px-2 py-0 rounded mr-2"
      />
      <select name="priority" value={newTask.priority} onChange={handleChange} className="border border-gray-400 px-2 py-0 rounded mr-2">
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select name="status" value={newTask.status} onChange={handleChange} className="border border-gray-400 px-2 py-0 rounded mr-2">
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleAddTask} className="px-4 py-0 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Add Task</button>
    </div>
  );
};

export default AddTaskForm;
