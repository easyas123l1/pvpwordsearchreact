import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import { v4 as uuid } from "uuid";
import classnames from "classnames";

export default function Puzzle({ words, name, code, users, time }) {
    const allWordIds = words.map((word) => {
        return word.id;
    });
    const allUsers = users.map((user) => {
        user.active = false;
        return user;
    });

    const [puzUsers, setPuzUsers] = useState([
        {
            games_users_id: "Solution",
            name: "Solution",
            solved: allWordIds,
            active: false,
        },
        ...allUsers,
        {
            games_users_id: "Blank Board",
            name: "Blank Board",
            solved: [],
            active: true,
        },
    ]);
    const [lines, setLines] = useState([]);
    const [showWords, setShowWords] = useState(true);

    useEffect(() => {
        buildLines();
    }, [code, puzUsers]); // eslint-disable-line react-hooks/exhaustive-deps

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
        let puzWords = [];
        puzUsers.forEach((user) => {
            if (user.active) {
                if (user.solved.length > 0) {
                    user.solved.forEach((id) => {
                        for (let word of words) {
                            if (word.id === id) {
                                puzWords.push(word);
                            }
                        }
                    });
                }
            }
        });
        const newAnswers = [];
        for (let word of puzWords) {
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
        for (let word of puzWords) {
            let newPosition = position + word.word.length;
            for (let i = position; i < newPosition; i++) {
                colorNumber = colorNumber % (colors.length - 1);
                let color = colors[colorNumber];
                const newObj = {
                    position: newAnswers[i].position,
                    color: color,
                };
                colorArray.push(newObj);
            }
            position = newPosition;
            ++colorNumber;
        }
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

    const toggleWords = (e) => {
        e.preventDefault();
        setShowWords(!showWords);
    };

    const onUserClick = (e) => {
        setPuzUsers(
            puzUsers.map((user) =>
                // eslint-disable-next-line
                user.games_users_id == e.target.id
                    ? { ...user, active: true }
                    : { ...user, active: false }
            )
        );
    };

    return (
        <>
            <div className={puzzle.puzzle}>
                <h1>{name}</h1>
                <button onClick={toggleWords} className={puzzle.findWordButton}>
                    {showWords ? "Hide" : "Show"} words
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
                    <p>{time} seconds</p>
                    <h1>WORDS</h1>
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
            <div className={puzzle.users}>
                <h1>Users</h1>
                <ul>
                    {puzUsers.map((user) => (
                        // className for active and onclick to change active.
                        <li
                            id={user.games_users_id}
                            key={user.games_users_id}
                            className={user.active ? "active" : ""}
                            onClick={onUserClick}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
