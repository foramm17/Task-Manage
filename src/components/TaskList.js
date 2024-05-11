import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="p-4 ">
      <table className="w-2/3 table-fixed rounded-md shadow-md shadow-cyan-500">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
