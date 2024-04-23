import React, { useState, useEffect } from 'react';
import Task from './TaskObj/Task';
import './Css/Project.css';

const TaskApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
      name: '',
      description: '',
      priority: 'Low',
      status: 'To do',
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
          name: '',
          description: '',
          priority: 'Low',
          status: 'To do',
  
        });
      }
    };
  
    const handleCreateTask = () => {
      if (validateTask()) {
        const id = '#' + Math.random().toString(36).substr(2, 9); // Generate random id
        const creationDate = new Date().toISOString(); // Set creation date
        const updatedTask = {
          ...newTask,
          id,
          creationDate,
          lastUpdated: creationDate // Set last updated to creation date initially
        };
        const updatedTasks = [...tasks, updatedTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setNewTask({
          name: '',
          description: '',
          priority: 'Low',
       
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
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default TaskApp;