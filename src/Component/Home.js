import "../Component/Home.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PostList from "../Component/PostList.js";
// import { Link } from "react-router-dom";

function App() {
  const [searchPost, setSerachPost] = useState([]);
  const [debounceTime, setDebounceTime] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const fetchPost = async (textQuery) => {
    let url = "http://hn.algolia.com/api/v1/search";

    if (textQuery) {
      url = `${url}?query=${textQuery}`;
      const res = await axios.get(url);
      const post = res.data.hits;
      setSerachPost(post);
      console.log(searchPost);
    }
  };

  // useEffect(() => {
  //   fetchPost();
  // });

  useEffect(() => {
    if (debounceTime !== 0) {
      clearTimeout(debounceTime);
    }
    const newTimeout = setTimeout(() => fetchPost(searchInput), 1000);
    setDebounceTime(newTimeout);
  }, [searchInput]);

  const onchangeSearch = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  // if (searchInput === "") {
  //   setKeywordSearched(true);
  // }

  return (
    <div className="App">
      {/* <h1>Hyrid Assignment</h1> */}
      <div className="search-container">
        <span className="search">Search</span>
        <input
          type="text"
          className="searchInput"
          value={searchInput}
          onChange={(e) => onchangeSearch(e)}
          placeholder="Enter Keyword..."
        />
      </div>
      {searchInput === "" ? (
        <p className="no-post">No post available use search to get data..</p>
      ) : (
        <div>
          {searchPost.map((item) => {
            const { title, points, comment } = item;
            return <PostList title={title} points={points} comment={comment} />;
          })}{" "}
        </div>
      )}
      {/* {searchPost.map((item) => {
        const { title, points, comment } = item;
        return <PostList title={title} points={points} comment={comment} />;
      })} */}
    </div>
  );
}

export default App;
