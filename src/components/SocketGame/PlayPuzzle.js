import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import puzzle from "../../styles/puzzle.module.scss";
import classnames from "classnames";
import "./WordSearch.css";

const PlayPuzzle = ({ words, name, code }) => {
    const [lines, setLines] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [size, setSize] = useState(0);
    const [firstClickLocation, setFirstClickLocation] = useState("");
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);
    const [showWords, setShowWords] = useState(true);
    useEffect(() => {
        setSize(Math.sqrt(code.length));
        buildLines();
        buildAnswers();
        setActive(true);
    }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let interval = null; // eslint-disable-line no-unused-vars
        if (active) {
            interval = setTimeout(() => {
                setTime(time + 1);
            }, 1000);
        }
    });

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

    const goUp = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${seperate[0]}, ${--seperate[1]}`;
        return newPosition;
    };

    const goDown = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${seperate[0]}, ${++seperate[1]}`;
        return newPosition;
    };

    const goUpLeft = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${--seperate[0]}, ${--seperate[1]}`;
        return newPosition;
    };

    const goLeft = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${--seperate[0]}, ${seperate[1]}`;
        return newPosition;
    };

    const goDownLeft = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${--seperate[0]}, ${++seperate[1]}`;
        return newPosition;
    };

    const goUpRight = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${++seperate[0]}, ${--seperate[1]}`;
        return newPosition;
    };

    const goRight = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${++seperate[0]}, ${seperate[1]}`;
        return newPosition;
    };

    const goDownRight = (position) => {
        let seperate = position.replace(",", "").split(" ");
        let newPosition = `${++seperate[0]}, ${++seperate[1]}`;
        return newPosition;
    };

    const buildAnswers = () => {
        const newAnswers = [];
        for (let word of words) {
            let { position, direction } = word;
            let letters = word.word.split("");
            for (let letter of letters) {
                const newItem = {
                    position: position,
                    character: letter,
                };
                newAnswers.push(newItem);
                if (direction === "Up") {
                    position = goUp(position);
                }
                if (direction === "Down") {
                    position = goDown(position);
                }
                if (direction === "UpLeft") {
                    position = goUpLeft(position);
                }
                if (direction === "Left") {
                    position = goLeft(position);
                }
                if (direction === "DownLeft") {
                    position = goDownLeft(position);
                }
                if (direction === "UpRight") {
                    position = goUpRight(position);
                }
                if (direction === "Right") {
                    position = goRight(position);
                }
                if (direction === "DownRight") {
                    position = goDownRight(position);
                }
            }
        }
        setAnswers(newAnswers);
    };

    const handleColorChange = (color, solveWord) => {
        let newWords = JSON.parse(JSON.stringify(words));
        color = color + "word";
        let solvedWord = "";
        for (let word of newWords) {
            if (solveWord.wordIndex.word === word.word) {
                word.color = color;
                word.solved = "solved";
                solvedWord = word;
            }
        }
        // update the puzzle here.

        // in order to get both these function to work we will need to edit the original words object.
        // we will add a couple more properties on the back end called solved
        return solvedWord;
    };

    const wordFind = (e) => {
        //set variables needed
        let selected = e.target.id;
        let objWords = [];
        let index = -1;
        //loop thru words
        for (let word of words) {
            let length = word.word.length;
            let startIndex = index + 1;
            index += length;
            let endIndex = index;
            let arrayWord = [];
            arrayWord = answers.slice(startIndex, endIndex + 1);
            //make a obj with each words starting index, end index, length of word, the words text, and index.
            const newWord = {
                start: answers[startIndex].position,
                end: answers[endIndex].position,
                length: length,
                word: arrayWord,
                wordIndex: word,
            };
            //place the object inside an array.
            objWords.push(newWord);
        }
        //first click on puzzle starting point.
        if (firstClickLocation === "") {
            setFirstClickLocation(selected);
            for (let line of lines) {
                for (let i = 0; i <= size - 1; i++) {
                    if (line.text[i].id === selected) {
                        line.text[i].first = "first";
                    }
                }
            }
        } else {
            //second click on puzzle should allow us to connect dots
            //get second clicks coordinates
            let secondClick = selected;
            for (let word of objWords) {
                //if both first and second click are the same location then break out of loop.  NO CHEATING!!
                if (firstClickLocation === secondClick) {
                    break;
                }
                //if first click is the beggining or the end, and second click is the beggining or the end then that word is solved.
                if (
                    firstClickLocation === word.start ||
                    firstClickLocation === word.end
                ) {
                    if (
                        secondClick === word.start ||
                        secondClick === word.end
                    ) {
                        //loop thru the word to get positions, loop thru lines to find the positions.  When both match add class to circle letter.
                        let randomColor = Math.floor(Math.random() * 9);
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
                        let solvedWord = "";
                        for (
                            let wordLength = 0;
                            wordLength < word.length;
                            wordLength++
                        ) {
                            for (let line of lines) {
                                for (let i = 0; i <= size - 1; i++) {
                                    if (
                                        line.text[i].id ===
                                        word.word[wordLength].position
                                    ) {
                                        //this will circle the word.
                                        line.text[i].circle = "circle";
                                        //set random color for circle and word found
                                        line.text[i].color =
                                            colors[randomColor];
                                        solvedWord = handleColorChange(
                                            colors[randomColor],
                                            word
                                        );
                                    }
                                }
                            }
                        }
                        //test if all words are solved then puzzle is solved.  VICTORY!!!
                        let checkComplete = true;
                        for (let index of words) {
                            if (
                                index.solved !== "solved" &&
                                solvedWord.word !== index.word
                            ) {
                                checkComplete = false;
                            }
                        }
                        if (checkComplete) {
                            // send completePuzzle time to redux and send to completePuzzle page.
                            // completePuzzle(time);
                            // history.push("/completePuzzle");
                        }
                    }
                }
            }
            for (let line of lines) {
                for (let i = 0; i <= size - 1; i++) {
                    if (line.text[i].id === firstClickLocation) {
                        line.text[i].first = "";
                    }
                }
            }
            setFirstClickLocation("");
            setLines(lines);
        }
    };

    const checkTwoConnect = (first, second) => {
        //seperate rows and columns
        let firstPosition = first.replace(",", "");
        let secondPosition = second.replace(",", "");
        firstPosition = firstPosition.split(" ");
        secondPosition = secondPosition.split(" ");
        let firstRow = firstPosition[0];
        let firstColumn = firstPosition[1];
        let secondRow = secondPosition[0];
        let secondColumn = secondPosition[1];
        //compare rows then compare columns
        let rowDifference = secondRow - firstRow;
        let columnDifference = secondColumn - firstColumn;
        //build a return array
        let returnArray = [rowDifference, columnDifference, true];
        //test for connection possible
        if (rowDifference === 0 || columnDifference === 0) {
            return returnArray;
        } else if (
            rowDifference === columnDifference ||
            rowDifference * -1 === columnDifference
        ) {
            return returnArray;
        } else {
            returnArray[2] = false;
            return returnArray;
        }
    };

    const mouseHover = (e) => {
        //if position hovered is the same as start or no click then nothing happens.
        if (firstClickLocation === "" || firstClickLocation === e.target.id) {
            return;
        }
        //return the difference of row and column and if possible
        let returnArray = checkTwoConnect(firstClickLocation, e.target.id);
        let rowDifference = returnArray[0];
        let columnDifference = returnArray[1];
        let possible = returnArray[2];
        //split rows and columns
        let startPosition = firstClickLocation.replace(",", "");
        startPosition = startPosition.split(" ");
        let startRow = startPosition[0];
        let startColumn = startPosition[1];
        //start the array of positions
        let locations = [startRow + ", " + startColumn];
        //if possible then loop thru all coordinates and add to an array to be styled
        if (possible) {
            while (rowDifference !== 0 || columnDifference !== 0) {
                if (rowDifference > 0) {
                    rowDifference--;
                    startRow++;
                } else if (rowDifference < 0) {
                    rowDifference++;
                    startRow--;
                }
                if (columnDifference > 0) {
                    columnDifference--;
                    startColumn++;
                } else if (columnDifference < 0) {
                    columnDifference++;
                    startColumn--;
                }
                let position = startRow + ", " + startColumn;
                locations.push(position);
            }
        } else {
            return;
        }
        let newLines = JSON.parse(JSON.stringify(lines));
        for (let index of locations) {
            for (let line of newLines) {
                for (let i = 0; i <= size - 1; i++) {
                    if (line.text[i].id === index) {
                        line.text[i].hover = "hover";
                    }
                }
            }
        }
        setLines(newLines);
    };

    const mouseLeave = () => {
        let newLines = JSON.parse(JSON.stringify(lines));
        for (let line of newLines) {
            for (let i = 0; i <= size - 1; i++) {
                if (line.text[i].hover === "hover") {
                    line.text[i].hover = "";
                }
            }
        }
        setLines(newLines);
    };

    const toggleWords = (e) => {
        e.preventDefault();
        setShowWords(!showWords);
    };

    return (
        <div className={puzzle.background}>
            <div className={puzzle.puzzle}>
                <h1>{name}</h1>
                <button onClick={toggleWords} className={puzzle.findWordButton}>
                    {showWords ? "Hide" : "Show"} words to find
                </button>
                <ul onClick={wordFind}>
                    {lines.map((line) => (
                        <li
                            id={line.id}
                            key={line.id}
                            className={puzzle.findWordRow}
                        >
                            {line.text.map((letter) => (
                                <p
                                    onMouseEnter={mouseHover}
                                    onMouseLeave={mouseLeave}
                                    id={letter.id}
                                    key={letter.id}
                                    className={classnames(
                                        letter.hover,
                                        letter.first,
                                        letter.circle,
                                        letter.color
                                    )}
                                >
                                    {letter.text}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            {showWords && (
                <div className={puzzle.wordsToFind}>
                    <p>{time} seconds </p>
                    <h1>WORDS TO FIND:</h1>
                    <ul>
                        {words.map((word) => (
                            <li
                                id={word.id}
                                key={word.id}
                                className={word.color}
                            >
                                {word.word}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={toggleWords}
                        className={puzzle.hideWordButton}
                    >
                        Hide words
                    </button>
                </div>
            )}
        </div>
    );
};

export default PlayPuzzle;
