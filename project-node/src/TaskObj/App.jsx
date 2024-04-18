import React from 'react';
import Task from './Task';

const App = () => {
  const task = {
    TaskID: '#Th234M',
    TaskName: 'Update calendar',
    Description: 'Need to update calendar notes.',
    Priority: 'Medium',
    Status: 'In Progress',
    CreationDate: '2024.01.10',
    LastUpdated: '2024.02.19',
  };

  return <Task task={task} />;
};

export default App;