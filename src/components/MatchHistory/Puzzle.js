import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import { v4 as uuid } from "uuid";
import classnames from "classnames";

export default function Puzzle({ words, name, code, users }) {
    const [lines, setLines] = useState([]);
    const [showWords, setShowWords] = useState(true);

    useEffect(() => {
        buildLines();
        buildAnswers();
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
    };

    const toggleWords = (e) => {
        e.preventDefault();
        setShowWords(!showWords);
    };

    return (
        <>
            <div className={puzzle.puzzle}>
                <h1>{name}</h1>
                <button onClick={toggleWords} className={puzzle.findWordButton}>
                    {showWords ? "Hide" : "Show"} words to find
                </button>
                <ul>
                    {lines.map((line) => (
                        <li
                            id={line.id}
                            key={line.id}
                            className={puzzle.findWordRow}
                        >
                            {line.text.map((letter) => (
                                <p
                                    id={letter.id}
                                    key={letter.id}
                                    className={classnames(
                                        letter.hover,
                                        letter.first,
                                        letter.circle,
                                        letter.color,
                                        puzzle.puzzleParagraph
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
        </>
    );
}
