import React from "react";

import "./error.css"

export default function Error({ message }) {
  return (
    <div>
      <span className="error-msg">
        {message}
      </span>
    </div>
  );
}