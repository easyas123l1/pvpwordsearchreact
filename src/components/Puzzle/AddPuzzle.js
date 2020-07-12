import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";
import "./WordSearch.css";
import { reduxSavePuzzle } from "../../store/actions/puzzleAction";
import Footer from "../Footer/Footer";

const AddPuzzle = ({ title, words, size, reduxSavePuzzle }) => {
  const [lines, setLines] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [impossible, setImpossible] = useState(false);
  const [showWords, setShowWords] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // my guess on how to do this is have loop thru words to get text of each one count the length and then pull that many out objects out of the array answers.  For puzzles with lots of words this would be painful slow process so maybe we build an array of id's with color and then loop thru lines and update at the end.
    // create a for loop to loop thru words.  We will loop thru count each word.text
    if (showWords) {
      const colorArray = [];
      let colors = [
        "cyan",
        "red",
        "green",
        "orange",
        "pink",
        "yellow",
        "purple",
        "brown",
        "silver",
      ];
      let colorNumber = 0;
      let position = 0;
      for (let word of words) {
        let newPosition = position + word.text.length;
        for (let i = position; i < newPosition; i++) {
          colorNumber = colorNumber % (colors.length - 1);
          let color = colors[colorNumber];
          const newObj = {
            position: answers[i].position,
            color: color,
          };
          colorArray.push(newObj);
        }
        position = newPosition;
        ++colorNumber;
      }
      let newLines = JSON.parse(JSON.stringify(lines));
      for (let lines of newLines) {
        for (let line of lines.text) {
          for (let position of colorArray) {
            if (position.position === line.id) {
              line.color = position.color;
            }
          }
        }
      }
      setLines(newLines);
    } else {
      let newLines = JSON.parse(JSON.stringify(lines));
      for (let lines of newLines) {
        for (let line of lines.text) {
          line.color = "";
        }
      }
      // if false we make sure words are not shown/solved.
      setLines(newLines);
    }
  }, [showWords, answers, words]); // eslint-disable-line react-hooks/exhaustive-deps

  // the *root* function that calls the rest to build our puzzle
  const generatePuzzle = () => {
    const newAnswers = placeWords();
    const newLines = [];
    setAnswers(newAnswers);
    for (let i = 0; size > i; i++) {
      const line = [];
      for (let i2 = 0; size > i2; i2++) {
        let letterid = "";
        let letter = "";
        letterid = `${i}, ${i2}`;
        for (let answer of newAnswers) {
          if (answer.position === letterid) {
            letter = answer.character;
          }
        }
        if (letter === "") {
          letter = randomLetter();
        }
        const newLetter = {
          text: letter,
          id: letterid,
          circle: "",
          first: "",
          color: "",
          hover: "",
        };
        line.push(newLetter);
        if (i2 + 1 === size) {
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
  // useEffect that generates a puzzle on load and every time words or size change.
  useEffect(() => {
    setLines([]);
    setAnswers([]);
    generatePuzzle();
  }, [words, size]); // eslint-disable-line react-hooks/exhaustive-deps

  // selects a random position on the board
  const randomPosition = () => {
    let position1 = Math.floor(Math.random() * size);
    let position2 = Math.floor(Math.random() * size);

    return `${position1}, ${position2}`;
  };

  // selects a random letter
  const randomLetter = () => {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return possible.charAt(Math.floor(Math.random() * possible.length));
  };

  // test which directions a word can go.
  const testDirections = (word, position) => {
    // function test the four directions up right down and left.
    let length = word.length - 1;
    let newPosition = position.replace(",", "");
    newPosition = newPosition.split(" ");
    let row = newPosition[0];
    let column = newPosition[1];
    row = +row;
    column = +column;
    let up = true;
    let left = true;
    let down = true;
    let right = true;
    if (column - length < 0) {
      up = false;
    }
    if (row - length < 0) {
      left = false;
    }
    if (column + length > size - 1) {
      down = false;
    }
    if (row + length > size - 1) {
      right = false;
    }
    return [up, left, down, right, row, column];
  };

  // test diagonal directions
  const testDiagonal = (d1, d2) => {
    // test direction1 and direction2
    if (d1 && d2) {
      return true;
    }
    return false;
  };

  // create position character object
  const logPosition = (row, column, character) => {
    let position = `${row}, ${column}`;
    const newCharacter = {
      position: position,
      character: character,
    };
    return newCharacter;
  };

  // this is for words that go up
  const goUp = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
    }
    return coordinates;
  };

  // this is for words that go up and right
  const goUpRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row++;
    }
    return coordinates;
  };

  // this is for words that go right
  const goRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++;
    }
    return coordinates;
  };

  // this is for words that go down and right
  const goDownRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++;
      column++;
    }
    return coordinates;
  };

  // this is for words that go down
  const goDown = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
    }
    return coordinates;
  };

  // this is for words that go down and left
  const goDownLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row--;
    }
    return coordinates;
  };

  // this is for words that go left
  const goLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row--;
    }
    return coordinates;
  };

  // this is for words that go up and left
  const goUpLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row--;
    }
    return coordinates;
  };

  // this checks to see if the random position has been tried
  const randomChecker = (tried) => {
    let newPosition = false;
    while (!newPosition) {
      const newRandomPosition = randomPosition();
      newPosition = true;
      for (let index of tried) {
        if (newRandomPosition === index) {
          newPosition = false;
        }
      }
      if (newPosition) {
        return newRandomPosition;
      }
    }
  };

  // this is the function that attempts to place our words within the size of our puzzle.  Side note this function works great at smaller amount of words.  Once users get to about 1000 words this function will slow down as the random process has a hard time finding new positions/directions.  Will also kick out after so many unsuccesful attempts.  (plan on commenting out some of this function later)
  const placeWords = () => {
    const newWords = [];
    for (let word of words) {
      newWords.push(word.text);
    }
    let coordinates = [];

    for (let word of newWords) {
      let attempts = 0;
      let possiblePlacement = true;
      let triedPositions = [];
      do {
        attempts++;
        const maxTries = size * size;
        if (triedPositions.length === maxTries) {
          console.log("max positions tried");
          alert(
            "word length is too long, or puzzle size is too small.  Try adding size or using smaller words"
          );
          setImpossible(true);
        }

        const randomPosition = randomChecker(triedPositions);

        const directions = testDirections(word, randomPosition);
        const [
          directUp,
          directLeft,
          directDown,
          directRight,
          row,
          column,
        ] = directions;
        if (!directUp && !directLeft && !directDown && !directRight) {
          possiblePlacement = false;
        } else {
          const directUpLeft = testDiagonal(directUp, directLeft);
          const directUpRight = testDiagonal(directUp, directRight);
          const directDownRight = testDiagonal(directDown, directRight);
          const directDownLeft = testDiagonal(directDown, directLeft);

          const objUp = {
            direction: "Up",
            possible: directUp,
          };
          const objUpRight = {
            direction: "UpRight",
            possible: directUpRight,
          };
          const objRight = {
            direction: "Right",
            possible: directRight,
          };
          const objDownRight = {
            direction: "DownRight",
            possible: directDownRight,
          };
          const objDown = {
            direction: "Down",
            possible: directDown,
          };
          const objDownLeft = {
            direction: "DownLeft",
            possible: directDownLeft,
          };
          const objLeft = {
            direction: "Left",
            possible: directLeft,
          };
          const objUpLeft = {
            direction: "UpLeft",
            possible: directUpLeft,
          };

          const possibleDirections = [
            objUp,
            objUpRight,
            objRight,
            objDownRight,
            objDown,
            objDownLeft,
            objLeft,
            objUpLeft,
          ];
          let newPossibleDirections = [];

          for (let possibleDirection of possibleDirections) {
            if (possibleDirection.possible) {
              newPossibleDirections.push(possibleDirection);
            }
          }

          let tryThis = false;

          while (newPossibleDirections.length > 0 && !tryThis) {
            const randomDirection = Math.floor(
              Math.random() * newPossibleDirections.length
            );
            const tryDirection = newPossibleDirections[randomDirection];
            let wordPossibleCoordinates = [];
            let wordPossible = true;
            if (tryDirection.direction === "Up") {
              wordPossibleCoordinates = goUp(word, row, column);
            } else if (tryDirection.direction === "UpRight") {
              wordPossibleCoordinates = goUpRight(word, row, column);
            } else if (tryDirection.direction === "Right") {
              wordPossibleCoordinates = goRight(word, row, column);
            } else if (tryDirection.direction === "DownRight") {
              wordPossibleCoordinates = goDownRight(word, row, column);
            } else if (tryDirection.direction === "Down") {
              wordPossibleCoordinates = goDown(word, row, column);
            } else if (tryDirection.direction === "DownLeft") {
              wordPossibleCoordinates = goDownLeft(word, row, column);
            } else if (tryDirection.direction === "Left") {
              wordPossibleCoordinates = goLeft(word, row, column);
            } else {
              wordPossibleCoordinates = goUpLeft(word, row, column);
            }
            if (word === "0") {
              coordinates = wordPossibleCoordinates;
              tryThis = true;
            } else {
              for (let coordinate of coordinates) {
                if (!wordPossible) {
                  break;
                }
                for (let possibleCoordinate of wordPossibleCoordinates) {
                  if (
                    coordinate.position === possibleCoordinate.position &&
                    coordinate.character !== possibleCoordinate.character
                  ) {
                    if (newPossibleDirections.length === 1) {
                      newPossibleDirections = [];
                      wordPossible = false;
                    } else {
                      newPossibleDirections = newPossibleDirections.slice(
                        randomDirection,
                        1
                      );
                      wordPossible = false;
                      break;
                    }
                  }
                }
              }
              if (wordPossible) {
                coordinates = coordinates.concat(wordPossibleCoordinates);
                tryThis = true;
                possiblePlacement = true;
                break;
              }
            }
            if (newPossibleDirections.length === 0) {
              possiblePlacement = false;
            }
          }
        }
        if (attempts === 80 && !possiblePlacement) {
          console.log("max attempts");
          alert(
            "word length is too long, or puzzle size is too small.  Try adding size or using smaller words"
          );
          if (!impossible) {
            setImpossible(true);
          }
        }
        if (!possiblePlacement) {
          triedPositions.push(randomPosition);
        }
      } while (attempts < 80 && !possiblePlacement);
    }
    return coordinates;
  };

  // the button that allows you to rebuild new puzzle.
  const regeneratePuzzle = () => {
    setLines([]);
    setAnswers([]);
    generatePuzzle();
  };

  // turn the data into variables for the database/call to database to save puzzle/words
  const savePuzzle = (e) => {
    const wordPosDir = wordPositionDirection();
    let letters = [];
    lines.forEach((line) => {
      line.text.map((letter) => letters.push(letter.text));
    });
    letters = letters.join("");
    // word position direction
    // letters === code for puzzle.
    // title
    // user id who created puzzle
    // object should have name, code, description, and array of words
    let savePuz = {
      name: title,
      code: letters,
      description: "",
      words: wordPosDir,
    };
    reduxSavePuzzle(savePuz);
  };

  // the function thats turning the data into variables the database can understand and save.
  const wordPositionDirection = () => {
    let index = 0;
    let final = [];
    for (let word of words) {
      let dir = "";
      let first = answers[index].position;
      let second = answers[index + 1].position;
      let firstPos = first.replace(",", "").split(" ");
      let secondPos = second.replace(",", "").split(" ");
      if (+firstPos[0] === +secondPos[0]) {
        if (+firstPos[1] > +secondPos[1]) {
          dir = "Up";
        } else {
          dir = "Down";
        }
      }
      if (+firstPos[0] > +secondPos[0]) {
        if (+firstPos[1] > +secondPos[1]) {
          dir = "UpLeft";
        } else if (+firstPos[1] === +secondPos[1]) {
          dir = "Left";
        } else {
          dir = "DownLeft";
        }
      }
      if (+firstPos[0] < +secondPos[0]) {
        if (+firstPos[1] > +secondPos[1]) {
          dir = "UpRight";
        } else if (+firstPos[1] === +secondPos[1]) {
          dir = "Right";
        } else {
          dir = "DownRight";
        }
      }
      const newObj = {
        word: word.text,
        position: answers[index].position,
        direction: dir,
      };
      final.push(newObj);
      index += word.text.length;
    }
    return final;
  };

  const handleToggleWords = () => {
    if (showWords) {
      setShowWords(false);
    } else {
      setShowWords(true);
    }
  };

  // !!!NOT COMPLETED!!! THIS FUNCTION SEND USER BACK TO PREVIOUS PAGE TO EDIT PUZZLE!  Genius!
  const editPuzzle = (e) => {
    history.push("/createPuzzle");
  };

  return (
    <div className={puzzle.spacer}>
      <div className={puzzle.background}>
        <div className={puzzle.puzzle}>
          <button onClick={regeneratePuzzle} className={puzzle.generateNew}>
            Generate new Puzzle
          </button>
          <button onClick={savePuzzle} className={puzzle.savePuzzle}>
            Save Puzzle
          </button>
          <button onClick={editPuzzle} className={puzzle.editPuzzle}>
            Edit Puzzle
          </button>
          <h1>{title}</h1>
          <ul>
            {lines.map((line) => (
              <li id={line.id} key={line.id} className={puzzle.findWordRow}>
                {line.text.map((letter) => (
                  <p id={letter.id} key={letter.id} className={letter.color}>
                    {letter.text}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={puzzle.printWordsToFindUl}>
            <h1>WORDS TO FIND:</h1>
            <ul>
              {words &&
                words.map((word) => (
                  <li id={word.id} key={word.id}>
                    {word.text}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <label>
              Show Words:
              <input
                name="showWords"
                type="checkbox"
                checked={showWords}
                onChange={handleToggleWords}
              />
            </label>
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

export default connect(mapStateToProps, { reduxSavePuzzle })(AddPuzzle);
