 import "../Styles/Search.css"
 import {HiOutlineSearch} from "react-icons/hi"
 const Search=(props)=>{
  const handlesearch=()=>{
    props.fetchWeather(props.city)
  }
    return(
<div>
<HiOutlineSearch />

      <input className="Search-bar"
      placeholder="Enter The City name"
        type="text"
        value={props.city}
        onChange={(e) => {props.setCity(e.target.value)}}
      />
      <button className="search-button" onClick={handlesearch}>Search</button>
    </div>    )
}
export default Search