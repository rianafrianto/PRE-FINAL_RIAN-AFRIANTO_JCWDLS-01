import React from "react";
import { Link } from "react-router-dom";
import pagenotfoundImage from "./pagenotfound.jpg";
import "./style.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>Oops..! 404 Page Not Found!</h1>
      <p>Looks like you came to wrong page on our server.</p>
      <Link to="/">
        <h2 className="notfound-text">Back To Page</h2>
      </Link>
      <img
        className="image_notfound"
        src={pagenotfoundImage}
        height="500"
        width="500"
        alt="not found"
      />
    </div>
  );
}
