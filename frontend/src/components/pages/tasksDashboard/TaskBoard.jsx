import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../services/AuthContext';

const apiBaseUrl = 'http://localhost:8080/api/projects';
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

const TaskBoard = ({ projectId, onProjectStatusChange }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/${projectId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await axiosInstance.put(`/${projectId}/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
      // Update project status here
      const statuses = tasks.map(task => task.status);
      if (statuses.includes('TODO') || statuses.includes('IN_PROGRESS')) {
        onProjectStatusChange('IN_PROGRESS');
      } else {
        onProjectStatusChange('DONE');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = async (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    try {
      const response = await axios.put(
        `http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks(); // Assuming fetchTasks is a function that fetches tasks again after updating status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const renderTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <li key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
          {task.status}
        </li>
      ));
  };

  return (
    <div className="kanban-board">
      <div className="lane" id="todo" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'TODO')}>
        <h3>TODO</h3>
        <ul>{renderTasksByStatus('TODO')}</ul>
      </div>
      <div className="lane" id="in-progress" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'IN_PROGRESS')}>
        <h3>IN PROGRESS</h3>
        <ul>{renderTasksByStatus('IN_PROGRESS')}</ul>
      </div>
      <div className="lane" id="done" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'DONE')}>
        <h3>DONE</h3>
        <ul>{renderTasksByStatus('DONE')}</ul>
      </div>
    </div>
  );
};

export default TaskBoard;
