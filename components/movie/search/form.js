import { useState, memo } from "react";

function Form({ setUrl }) {
  const [name, setName] = useState("");

  function handleMovieName(e) {
    setName(e.target.value);
  }

  function handleMovieSearch(e) {
    e.preventDefault();

    if (name.length !== 0) {
      setUrl(`https://www.omdbapi.com/?s=${name}&apikey=8efdf7b9`);
    } else {
      window.alert("Please enter movie name!");
    }
  }

  return (
    <form onSubmit={handleMovieSearch}>
      <label>
        Movie Name
        <input type="text" value={name} onChange={(e) => handleMovieName(e)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default memo(Form);
