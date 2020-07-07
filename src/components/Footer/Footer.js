import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function Footer() {
  return (
    <div className={puzzle.footer}>
      <p>
        Click here to contact the creator:{" "}
        <a
          href="mailto:andrew.wilson90@hotmail.com?Subject=Word Search Puzzle"
          target="_top"
        >
          Send Mail
        </a>
      </p>
    </div>
  );
}
