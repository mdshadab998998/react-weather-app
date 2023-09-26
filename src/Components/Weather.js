import "../Styles/weather.css"
export const Weather=(props)=>{
    const { name, main, weather: conditions } = props.weather;
    const temp = props.unit === 'metric' ? main.temp : ((main.temp * 1.8) + 32).toFixed(2);


    return (
      <div className="main-container-weth">
        <h2 className="weather-head">Weather in {name}</h2>
        <p className="temp">Temperature: {temp} &deg;{props.unit===`metric`?`C`:`F`}</p>
        <p className="condition">Condition: {conditions[0].description}</p>
        <img className="img"
          src={`http://openweathermap.org/img/w/${conditions[0].icon}.png`}
          alt={conditions[0].description}
        />
      </div>
    );
}