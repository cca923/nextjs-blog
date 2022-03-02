import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  fetchMovieCancelled,
  fetchMovieRequest,
} from "../../../redux/movie-result";

function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleMovieName(e) {
    setName(e.target.value);
  }

  function handleMovieSearch(e) {
    e.preventDefault();

    if (name.length !== 0) {
      dispatch(
        fetchMovieRequest(`https://www.omdbapi.com/?s=${name}&apikey=8efdf7b9`)
      );
    } else {
      window.alert("Please enter movie name!");
    }
  }

  function handleCancelSearch() {
    setName("");
    dispatch(fetchMovieCancelled());
  }

  return (
    <form onSubmit={handleMovieSearch}>
      <label>
        Movie Name
        <input type="text" value={name} onChange={(e) => handleMovieName(e)} />
      </label>
      <button type="submit">Search</button>
      <button type="button" onClick={handleCancelSearch}>
        Cancel
      </button>
    </form>
  );
}

export default Form;
