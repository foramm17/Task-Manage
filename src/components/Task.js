import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const Task = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [statusChangedToCompleted, setStatusChangedToCompleted] =
    useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    // Show toast message when task is deleted
    toast.error("Task deleted successfully");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the status is changing to Completed
    if (name === "status" && value === "Completed") {
      // Set the flag to indicate that status has changed to Completed
      setStatusChangedToCompleted(true);
    }
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(false);
    // If status has changed to Completed, show toast only for that
    if (statusChangedToCompleted) {
      toast.success("Task Completed!!");
    } else {
      // Show toast message when task is updated, except when status is Completed
      toast.info("Task updated successfully");
    }
    // Reset the flag after handling the toast
    setStatusChangedToCompleted(false);
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center justify-center p-5 text-center mb-4 rounded-md shadow-lg bg-slate-200">
      <div className="col-span-2">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="p-2 rounded-md w-full"
          />
        ) : (
          task.title
        )}
      </div>
      <div className="col-span-2 ">
        {isEditing ? (
          <input
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="p-2 rounded-md w-full "
          />
        ) : (
          task.description
        )}
      </div>
      <div className="col-span-2">
        {isEditing ? (
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="p-2 rounded-md w-full"
          />
        ) : (
          task.dueDate
        )}
      </div>
      <div className="col-span-2">
        {isEditing ? (
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="p-2 rounded-md w-full bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        ) : (
          task.priority
        )}
      </div>
      <div className="col-span-2">
        {isEditing ? (
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="p-2 rounded-md w-full bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          <span
            className={`${
              task.status === "Pending"
                ? "text-violet-600  font-bold rounded-md py-2 px-4"
                : task.status === "In Progress"
                ? "text-pink-600  font-bold rounded-md py-2 px-4"
                : ""
            }`}
          >
            {task.status}
          </span>
        )}
      </div>
      <div className="col-span-2">
        {isEditing ? (
          <div className="flex gap-2 justify-center text-lg">
            <button
              onClick={handleSave}
              className="p-2 rounded-md hover:text-green-700 text-xl"
            >
              <IoCheckmark />
            </button>
            <button
              className="p-2 rounded-md hover:text-sky-400 text-xl"
              onClick={() => setIsEditing(false)}
            >
              <RxCross2 />
            </button>
          </div>
        ) : (
          <div className="flex gap-1 justify-center">
            <button
              className="p-2 rounded-md  hover:text-yellow-600 text-xl"
              onClick={handleEdit}
            >
              <BiEditAlt />
            </button>
            <button
              className="p-2 rounded-md text-xl hover:text-red-600"
              onClick={handleDelete}
            >
              <RiDeleteBin7Line />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
