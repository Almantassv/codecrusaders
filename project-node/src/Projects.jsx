import React, { useState, useEffect } from 'react';
import Task from './TaskObj/Task';
import './Css/Project.css'
const TaskApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
      id: '',
      name: '',
      description: '',
      priority: 'Low',
      status: 'To do',
      creationDate: '',
      lastUpdated: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [addButtonText, setAddButtonText] = useState('Add new task');
    const [editingTask, setEditingTask] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
  
    useEffect(() => {
      // localStorage
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTask({
        ...newTask,
        [name]: value
      });
    };
  
    const handlePriorityChange = () => {
      const priorities = ['Low', 'Medium', 'High'];
      const currentIndex = priorities.indexOf(newTask.priority);
      const nextIndex = (currentIndex + 1) % priorities.length;
      setNewTask({
        ...newTask,
        priority: priorities[nextIndex]
      });
    };
  
    const handleStatusChange = () => {
      const statuses = ['To do', 'In Progress', 'Done'];
      const currentIndex = statuses.indexOf(newTask.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      setNewTask({
        ...newTask,
        status: statuses[nextIndex]
      });
    };
  
    const handleAddTask = () => {
      if (!showForm) {
        setShowForm(true);
        setAddButtonText('Close');
      } else {
        setShowForm(false);
        setAddButtonText('Add new task');
        setEditingTask(false);
        setEditTaskId(null);
        setNewTask({
          id: '',
          name: '',
          description: '',
          priority: 'Low',
          status: 'To do',
          creationDate: '',
          lastUpdated: ''
        });
      }
    };
  
    const handleCreateTask = () => {
      if (validateTask()) {
        if (editingTask) {
          const updatedTasks = tasks.map(task => {
            if (task.id === editTaskId) {
              return newTask;
            }
            return task;
          });
          setTasks(updatedTasks);
          setEditingTask(false);
          setEditTaskId(null);
        } else {
          const updatedTasks = [...tasks, newTask];
          setTasks(updatedTasks);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setNewTask({
          id: '',
          name: '',
          description: '',
          priority: 'Low',
          status: 'To do',
          creationDate: '',
          lastUpdated: ''
        });
        setShowForm(false);
        setAddButtonText('Add new task');
      } else {
        alert('Please fill in all fields');
      }
    };
  
    const validateTask = () => {
      return Object.values(newTask).every((val) => val !== '');
    };
  
    const handleDeleteTask = (taskId) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleEditTask = (taskId) => {
      setEditingTask(true);
      setEditTaskId(taskId);
      const taskToEdit = tasks.find(task => task.id === taskId);
      setNewTask(taskToEdit);
      setShowForm(true);
      setAddButtonText('Close');
    };
  
    return (
      <div className="task-app">
       
        <h1>Tasks</h1>
         <div className='task-form'>
        {showForm && (
          <>
            <input
              type="text"
              placeholder="Task ID"
              name="id"
              value={newTask.id}
              onChange={handleInputChange}
              readOnly={editingTask}
            />
            <input
              type="text"
              placeholder="Task Name"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <div>
              <button onClick={handlePriorityChange}>{newTask.priority}</button>
            </div>
            <div>
              <button onClick={handleStatusChange}>{newTask.status}</button>
            </div>
            <input
              type="text"
              placeholder="Creation Date"
              name="creationDate"
              value={newTask.creationDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Updated"
              name="lastUpdated"
              value={newTask.lastUpdated}
              onChange={handleInputChange}
            />
            <button onClick={handleCreateTask}>{editingTask ? 'Update' : 'Create'}</button>
          </>
        )}
        <button onClick={handleAddTask}>{addButtonText}</button>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div key={index}>
              <Task task={task} />
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleEditTask(task.id)}>Redact</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default TaskApp;
