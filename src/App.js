import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import CompletedTaskList from "./components/CompletedTaskList";
import { IoSearch } from "react-icons/io5";
import emptylist from "../src/images/emptylist.png";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks || [];
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const customStatusOrder = {
    Pending: 0,
    "In Progress": 1,
    Completed: 2,
  };

  let filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (sortBy === "dueDate") {
    filteredTasks = filteredTasks.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    filteredTasks = filteredTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sortBy === "status") {
    filteredTasks = filteredTasks.sort(
      (a, b) =>
        customStatusOrder[a.status] - customStatusOrder[b.status] ||
        a.title.localeCompare(b.title)
    );
  }

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div className="App font-serif h-screen bg-slate-200 p-5">
      <h1 className="text-center font-bold text-3xl p-5">Task Manager</h1>
      <AddTaskForm addTask={addTask} />
      <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-center sm:justify-between my-8">
        <div className="flex">
          <button
            className={`p-2 ${
              showCompletedTasks
                ? "bg-white text-black font-bold"
                : "bg-cyan-500 font-bold text-white"
            } rounded-l-lg`}
            onClick={() => setShowCompletedTasks(false)}
          >
            Todo
          </button>
          <button
            className={`p-2 ${
              showCompletedTasks
                ? "bg-teal-400 font-bold text-white"
                : "bg-white text-black font-bold"
            } rounded-r-lg`}
            onClick={() => setShowCompletedTasks(true)}
          >
            Completed
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center relative">
            <input
              type="text"
              id="searchInput"
              placeholder="Search task..."
              className="p-2 rounded-md"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IoSearch className="absolute right-3 text-slate-400" />
          </div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="py-2 px-4 bg-slate-300 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      {tasks.length > 0 ? (
        showCompletedTasks ? (
          <CompletedTaskList
            completedTasks={completedTasks}
            deleteTask={deleteTask}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            editTask={editTask}
            showCompletedTasks={showCompletedTasks}
          />
        )
      ) : (
        <div className="flex flex-col justify-center items-center py-10">
          <div className="w-1/6">
            <img src={emptylist} alt="" />
          </div>
          <p className="text-red-500 font-bold text-2xl text-center py-5">
            List empty
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
