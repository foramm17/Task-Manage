import React, { useState } from "react";
import Task from "./Task";
import { PiArrowsDownUp } from "react-icons/pi";
import { RiArrowUpDownLine } from "react-icons/ri";

const TaskList = ({ deleteTask, editTask, tasks, showCompletedTasks }) => {
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortChange = (criteria) => {
    if (criteria === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
  };

  const sortedTasks = () => {
    let filtered = tasks;
    if (!showCompletedTasks) {
      filtered = filtered.filter((task) => task.status !== "Completed");
    }
    if (sortBy === "dueDate") {
      return filtered.slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "priority") {
      return filtered.slice().sort((a, b) => {
        const priorityOrder = { Low: 0, Medium: 1, High: 2 };
        const priorityA = priorityOrder[a.priority];
        const priorityB = priorityOrder[b.priority];
        return sortDirection === "asc"
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    } else if (sortBy === "status") {
      return filtered.slice().sort((a, b) => {
        const statusOrder = { Pending: 0, "In Progress": 1, Completed: 2 };
        const statusA = statusOrder[a.status];
        const statusB = statusOrder[b.status];
        return sortDirection === "asc" ? statusA - statusB : statusB - statusA;
      });
    } else {
      
      return filtered.slice();
    }
  };

  return (
    <div className="bg-slate-100 rounded-md p-4">
      <h2 className="text-center text-lg font-bold mb-2 underline">TODOs</h2>
      <div className="hidden sm:grid grid-cols-12 font-bold gap-2 items-center justify-center p-5 text-center">
        <div className="col-span-2">Title</div>
        <div className="col-span-2">Description</div>
        <div
          onClick={() => handleSortChange("dueDate")}
          className="col-span-2 flex items-center justify-center gap-1 cursor-pointer"
        >
          Due Date
          {sortBy === "dueDate" &&
            (sortDirection === "asc" ? (
              <RiArrowUpDownLine />
            ) : (
              <PiArrowsDownUp />
            ))}
        </div>
        <div
          onClick={() => handleSortChange("priority")}
          className="col-span-2 flex justify-center items-center gap-1 cursor-pointer"
        >
          Priority
          {sortBy === "priority" &&
            (sortDirection === "asc" ? (
              <RiArrowUpDownLine />
            ) : (
              <PiArrowsDownUp />
            ))}
        </div>
        <div
          onClick={() => handleSortChange("status")}
          className="col-span-2 flex justify-center items-center gap-1 cursor-pointer"
        >
          Status{" "}
          {sortBy === "status" &&
            (sortDirection === "asc" ? (
              <RiArrowUpDownLine />
            ) : (
              <PiArrowsDownUp />
            ))}
        </div>
        <div className="col-span-2">Actions</div>
      </div>

      <div className="overflow-scroll max-h-96"> 
        {sortedTasks().map((task) => (
          <div key={task.id}>
            <Task
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;