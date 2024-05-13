import React, { useState } from "react";
import { userSchema } from "../validations/UserValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });


    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userSchema.validate(newTask, { abortEarly: false });


      if (
        newTask.title &&
        newTask.description &&
        newTask.dueDate &&
        newTask.priority &&
        newTask.status
      ) {

        addTask({ ...newTask, id: Date.now() });
        setNewTask({
          title: "",
          description: "",
          dueDate: null,
          priority: "",
          status: "",
        });

        toast.success("Task added successfully!");
      }
    } catch (error) {

      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-2 items-start pb-4 justify-center text-center"
      >
        <div className="col-span-12 sm:col-span-2 flex flex-col items-start">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleChange}
            className=" p-2 rounded-md w-full placeholder:text-black"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="col-span-12 sm:col-span-2 flex flex-col items-start truncate">
          <input
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleChange}
            className=" p-2 truncate rounded-md w-full placeholder:text-black"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="col-span-12 sm:col-span-2 flex flex-col items-start">
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate || ""}
            onChange={handleChange}
            className="p-2 rounded-md w-full"
          />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate}</p>}
        </div>
        <div className="col-span-12 sm:col-span-2 flex flex-col items-start">
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            className="p-3 rounded-md w-full bg-white"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <p className="text-red-500">{errors.priority}</p>}
        </div>
        <div className="col-span-12 sm:col-span-2 flex flex-col items-start">
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className=" p-3 rounded-md w-full bg-white "
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status}</p>}
        </div>
        <div className="col-span-12 sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className=" p-2 w-full rounded-md font-semibold text-white bg-sky-800"
          >
            ADD TASK
          </button>
          <ToastContainer hideProgressBar autoClose={2000} />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;