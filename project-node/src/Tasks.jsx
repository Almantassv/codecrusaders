import React, { useState } from 'react';

const Taskss = () => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {/* search */}
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      

      <div className="columns">
        <div className="column">
          <h2>Todo</h2>
          <p>Lets start</p>
          <button>Add new task</button>
        </div>
        <div className="column">
          <h2>In Progress</h2>
          <div className="task">
            <button>List item</button>
            <button>List item</button>
            <button>List item</button>
            <div className="task-details">
              {/* think */}
            </div>
          </div>
        </div>
        <div className="column">
          <h2>Done</h2>
        </div>
      </div>
    </div>
  );
};

export default Taskss;
