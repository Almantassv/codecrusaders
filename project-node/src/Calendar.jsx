import React from 'react';
import './Css/Calenadr.css'

const Calenadr = () => {
    const currentDate = new Date();
    const dates = Array.from({ length: 31 }, (_, index) => index + 1);
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
  
    const today = currentDate.getDate();
  
    return (
      <div className="calenadr-container">
        <div className="calenadr">
          <div className="date">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
          <div className="dates">
            {dates.map(date => {
              let classNames = "date-item";
              if (date === today) classNames += " today";
              if (new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay() === 0) classNames += " sunday";
              if (new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay() === 6) classNames += " saturday";
              return <div key={date} className={classNames}>{date}</div>;
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default Calenadr;