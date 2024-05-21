import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import "../../../styles/TaskBoard.css";

const apiBaseUrl = 'http://localhost:8080/api/projects';
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

const TaskBoard = () => {
  const { token } = useAuth();
  const { id: projectId } = useParams();
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

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = async (e, status) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    try {
      task.status = status;
      await axios.put(
        `http://localhost:8080/api/projects/${projectId}/tasks/${task.id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'task-priority-high';
      case 'medium':
        return 'task-priority-medium';
      case 'low':
        return 'task-priority-low';
      default:
        return '';
    }
  };

  const renderTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <li
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
          className={`task-item ${getPriorityClass(task.priority)}`}
        >
          {task.name}
        </li>
      ));
  };

  return (
    <div className="kanban-board">
      <div
        className="lane"
        id="todo"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'TODO')}
      >
        <h3 className="lane-header">TODO</h3>
        <ul className="task-list">{renderTasksByStatus('TODO')}</ul>
      </div>
      <div
        className="lane"
        id="in-progress"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'IN_PROGRESS')}
      >
        <h3 className="lane-header">IN PROGRESS</h3>
        <ul className="task-list">{renderTasksByStatus('IN_PROGRESS')}</ul>
      </div>
      <div
        className="lane"
        id="done"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'DONE')}
      >
        <h3 className="lane-header">DONE</h3>
        <ul className="task-list">{renderTasksByStatus('DONE')}</ul>
      </div>
    </div>
  );
};

export default TaskBoard;
