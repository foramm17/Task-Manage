import React from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "react-toastify";

const CompletedTaskList = ({ completedTasks, deleteTask }) => {
  const handleDelete = (taskId) => {
    deleteTask(taskId);
    // Show toast message when task is deleted
    toast.info("Task deleted successfully");
  };

  return (
    <div className="bg-slate-100 rounded-md p-4 overflow-y-scroll max-h-96">
      <h2 className="text-center text-lg font-bold mb-2 underline">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <div className="text-center text-red-500 font-bold text-2xl py-5">
          No completed tasks
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-2 items-center justify-center p-5 text-center font-bold">
            <div className="col-span-2">Title</div>
            <div className="col-span-2">Description</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Action</div>
          </div>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-12 gap-2 items-center justify-center p-5 text-center mb-4 rounded-md shadow-lg bg-slate-200"
            >
              <div className="col-span-2">{task.title}</div>
              <div className="col-span-2">{task.description}</div>
              <div className="col-span-2">{task.dueDate}</div>
              <div className="col-span-2">{task.priority}</div>
              <div className="col-span-2"><span className="text-teal-500  font-bold ">{task.status}</span></div>
              <div className="col-span-2">
                <button
                  onClick={() => handleDelete(task.id)} // Call handleDelete with taskId
                  className="text-red-500 text-xl"
                >
                    <RiDeleteBin7Line />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CompletedTaskList;
