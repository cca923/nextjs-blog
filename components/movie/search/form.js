import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  fetchMovieCancelled,
  fetchMovieRequest,
} from "../../../redux/toolkit/slice";

function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleMovieName(e) {
    setName(e.target.value);
  }

  function handleMovieSearch(e) {
    e.preventDefault();

    if (name.length !== 0) {
      dispatch(fetchMovieRequest(name));
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
