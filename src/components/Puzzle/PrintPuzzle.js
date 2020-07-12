import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import puzzle from "../../styles/puzzle.module.scss";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

function PrintPuzzle({ words, name, code }) {
  const [lines, setLines] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const history = useHistory();

  useEffect(() => {
    buildLines();
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  const buildLines = () => {
    let charPosition = 0;
    const newLines = [];
    let size = Math.sqrt(code.length);
    for (let i = 0; size > i; i++) {
      const line = [];
      for (let j = 0; size > j; j++) {
        let letterid = `${i}, ${j}`;
        let letter = code.charAt(charPosition);
        charPosition++;
        const newLetter = {
          text: letter,
          id: letterid,
          circle: "",
          first: "",
          color: "",
          hover: "",
        };
        line.push(newLetter);
        if (j + 1 === size) {
          const newLine = {
            text: line,
            id: uuid(),
          };
          newLines.push(newLine);
        }
      }
    }
    setLines(newLines);
  };

  const printPuzzle = (e) => {
    e.preventDefault();
    setShowButton(false);
    let interval = null; // eslint-disable-line no-unused-vars
    interval = setTimeout(() => {
      window.print();
    }, 1);
    interval = setTimeout(() => {
      setShowButton(true);
    }, 1);
  };

  const playPuzzle = (e) => {
    e.preventDefault();
    history.push("/playPuzzle");
  };

  return (
    <div className={puzzle.printPuzzle}>
      <div className={puzzle.puzzle}>
        {showButton && (
          <button onClick={printPuzzle} className={puzzle.printPuzzleButton}>
            Print
          </button>
        )}
        {showButton && (
          <button onClick={playPuzzle} className={puzzle.playPuzzleButton}>
            back to play puzzle
          </button>
        )}
        <h1>{name}</h1>
        <ul>
          {lines.map((line) => (
            <li id={line.id} key={line.id} className={puzzle.findWordRow}>
              {line.text.map((letter) => (
                <p>{letter.text}</p>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className={puzzle.printWordsToFind}>
        <h1>WORDS TO FIND:</h1>
        <div className={puzzle.printWordsToFindUl}>
          <ul>
            {words.map((word) => (
              <li id={word.id} key={word.id}>
                {word.word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    words: state.puzzleReducer.playPuzzleWords,
    name: state.puzzleReducer.playPuzzleName,
    code: state.puzzleReducer.playPuzzleCode,
  };
}

export default connect(mapStateToProps, {})(PrintPuzzle);
