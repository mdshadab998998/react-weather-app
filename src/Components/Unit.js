import { useState } from "react";
import "../Styles/Unit.css"
export const Unit=(props)=>{
    


    const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    props.setUnit(props.unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="unit-toggle">
    <p className="text-unit">Click to Change the Scale</p>
      <button
        className={`unit-btn ${toggle ? 'active' : ''}`}
        onClick={handleToggle}
      >
        {toggle ? '°F' : '°C'}
      </button>
    </div>
  );
}