import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { generatePuzzle } from "../../store/actions/puzzleAction";
import puzzle from "../../styles/puzzle.module.scss";
import Footer from "../Footer/Footer";

const CreatePuzzle = ({ title, words, size, generatePuzzle }) => {
  const [newWords, setWords] = useState(words || []);
  const [text, setText] = useState("");
  const [newSize, setSize] = useState(size || 10);
  const [badWords, setBadWords] = useState([]);
  const [newTitle, setTitle] = useState(title || "");

  const history = useHistory();

  useEffect(() => {
    if (badWords.length === 0) {
      var myTxt = require("../../assets/badwords.txt");
      readTextFile(myTxt);
    }
  }, [badWords.length]);

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          allText = allText.split("\n");
          setBadWords(allText);
        }
      }
    };
    rawFile.send(null);
  };

  const changeHandler = (e) => {
    e.persist();
    setText(e.target.value.toUpperCase());
  };

  const changeTitle = (e) => {
    e.persist();
    setTitle(e.target.value);
  };

  const changeSize = (e) => {
    e.persist();
    setSize(+e.target.value);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    let newerWords = newWords.filter((word) => !word.activate);
    setWords(newerWords);
  };

  const badWordTest = (word) => {
    // check if word is a bad word. naughty naughty!
    const foundWord = badWords.find((bw) => bw.toUpperCase().trim() === word);
    if (foundWord) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Input field can not be empty");
      return;
    }

    if (/[^a-zA-Z]/.test(text)) {
      alert(
        "Input must contain only letters A-Z. (No spaces, numbers, special characters, etc.)"
      );
      return;
    }

    if (text.length === 1) {
      alert("Words should be longer then 1 character.");
      return;
    }

    let bad = badWordTest(text);
    if (!bad) {
      alert("Please do not use bad words");
      return;
    }

    for (let word of newWords) {
      if (word.text === text) {
        alert("Please do not use the same word");
        return;
      }
    }

    const newItem = {
      text: text,
      id: Date.now(),
      activate: false,
      solved: false,
      color: "",
    };

    setWords([...newWords, newItem]);
    setText("");
  };

  const activateDelete = (e) => {
    let clickWord = e.target.innerText.split(" ");
    clickWord = clickWord[1];
    let newerWords = JSON.parse(JSON.stringify(newWords));
    for (let word of newerWords) {
      if (clickWord === word.text) {
        if (word.activate) {
          word.activate = false;
        } else {
          word.activate = true;
        }
      }
    }
    setWords(newerWords);
  };

  const generate = (e) => {
    e.preventDefault();
    const puzzle = {
      newTitle,
      newWords,
      newSize,
    };
    generatePuzzle(puzzle);
    history.push("/addPuzzle");
  };

  return (
    <div className={puzzle.spacer}>
      <div className={puzzle.background}>
        <div className={puzzle.createPuzzle}>
          <p className={puzzle.space}>1. Name the puzzle:</p>
          <input
            type="text"
            name="newTitle"
            onChange={changeTitle}
            placeholder="Title the puzzle!"
            value={newTitle}
            className={puzzle.space}
          />
          <p className={puzzle.space}>2. Add some words:</p>
          <form onSubmit={handleSubmit} className={puzzle.addWord}>
            <input
              type="text"
              name="newWord"
              onChange={changeHandler}
              placeholder="Words Here!"
              value={text}
              className={puzzle.space}
            />
            <button type="submit" className={puzzle.loginButton}>
              Add word # {newWords.length + 1}
            </button>
          </form>
          <form className={puzzle.addWord}>
            <p className={puzzle.space}>3. Pick a size (10-50)</p>
            <input
              type="number"
              name="newSize"
              onChange={changeSize}
              min="10"
              max="50"
              value={newSize}
              className={puzzle.space}
            />
          </form>
          <div className={puzzle.addWord}>
            <h1>Words to find!</h1>
            <p>
              to remove words click on the word, and click on the remove word
              button
            </p>
            <div className={puzzle.createFindWords}>
              <ul onClick={activateDelete}>
                {newWords &&
                  newWords.map((word, i) => (
                    <li
                      id={i}
                      key={word.id}
                      className={word.activate.toString()}
                    >
                      #{i + 1}: {word.text}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={puzzle.buttonsDiv}>
            <button onClick={handleRemove} className={puzzle.removeButton}>
              Remove word(s)
            </button>
            <button onClick={generate} className={puzzle.generateButton}>
              4. Generate Puzzle
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.puzzleReducer.title,
    words: state.puzzleReducer.words,
    size: state.puzzleReducer.size,
  };
};

export default connect(mapStateToProps, { generatePuzzle })(CreatePuzzle);
