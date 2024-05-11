import React, { useState } from 'react';
import { TrashIcon, PencilIcon, SaveIcon, XIcon } from '@heroicons/react/outline'; // Import the required icons

const Task = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{isEditing ? (
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-1 rounded"
        />) : (
        task.title
      )}</td>
      <td>{isEditing ? (
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          rows={3}
          className="border border-gray-400 px-2 py-1 rounded"
        ></textarea>) : (
        task.description
      )}</td>
      <td>{isEditing ? (
        <input
          type="date"
          name="dueDate"
          value={editedTask.dueDate}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-1 rounded"
        />) : (
        task.dueDate
      )}</td>
      <td>{isEditing ? (
        <select
          name="priority"
          value={editedTask.priority}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-1 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>) : (
        task.priority
      )}</td>
      <td>{isEditing ? (
        <select
          name="status"
          value={editedTask.status}
          onChange={handleChange}
          className="border border-gray-400 px-2 py-1 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>) : (
        task.status
      )}</td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2"><SaveIcon className="h-5 w-5" /></button>
            <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-400 text-white rounded-lg"><XIcon className="h-5 w-5" /></button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="px-2 py-1 bg-white rounded-lg mr-2"><PencilIcon className="text-gray-500 h-5 w-5" /></button>
            <button onClick={handleDelete} className="px-2 py-1 bg-white rounded-lg"><TrashIcon className="text-red-500 h-5 w-5" /></button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Task;
