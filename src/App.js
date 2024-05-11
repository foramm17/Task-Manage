import React from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { SearchIcon } from '@heroicons/react/solid'; // Import the search icon
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description of Task 1',
          dueDate: '2024-05-15',
          priority: 'High',
          status: 'Pending'
        },
        // Add more tasks as needed
      ],
      filteredTasks: [],
      sortBy: ''
    };
  }

  addTask = (newTask) => {
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  };

  deleteTask = (taskId) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId)
    });
  };

  editTask = (updatedTask) => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    });
  };

  handleSearch = (keyword) => {
    const filteredTasks = this.state.tasks.filter(task =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ filteredTasks });
  };

  handleSortChange = (e) => {
    const sortBy = e.target.value;
    this.setState({ sortBy });
  };

  sortTasks = (tasks) => {
    const { sortBy } = this.state;
    if (sortBy === 'dueDate') {
      return tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'priority') {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return tasks.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      return tasks;
    }
  };

  render() {
    const { filteredTasks, tasks, sortBy } = this.state;
    const displayTasks = filteredTasks.length ? filteredTasks : tasks;
    const sortedTasks = this.sortTasks(displayTasks);

    return (
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-semibold">Task Manager</h1>
        </header>


        <div className="p-4">
          <AddTaskForm addTask={this.addTask} />
        </div>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold mb-2 ml-12">List of Tasks</h1>
          <div className="flex items-center mr-12">
            <div className="relative mr-4">
              <input type="text" placeholder="Search task..." onChange={(e) => this.handleSearch(e.target.value)} className="px-2 py-1 pl-8 border border-gray-400 rounded" />
              <SearchIcon className="absolute top-1 right-2 h-6 w-6 text-gray-400" />
            </div>
            <select value={sortBy} onChange={this.handleSortChange} className="px-2 py-1 border border-gray-400 rounded">
              <option value="">Sort By</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
        <div className="p-4">
        <TaskList tasks={sortedTasks} deleteTask={this.deleteTask} editTask={this.editTask} />
        </div>


      </div>
    );
  }
}

export default App;