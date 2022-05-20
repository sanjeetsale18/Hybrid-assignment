import React from "react";
import "../Component/PostList.css";

export default function PostList(props) {
  return (
    <div>
      <div className="container">
        <p className="title">{props.title}</p>
        {/* <p>{props.points}</p> */}
      </div>
    </div>
  );
}
