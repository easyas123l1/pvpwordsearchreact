import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import puzzle from "../../styles/puzzle.module.scss";
import { Circle } from "react-spinners-css";
import Footer from "../Footer/Footer";

const WorldRecord = () => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        if (letters.length === 0) {
            const file = require("./letters.txt");
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = () => {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status === 0) {
                        let allText = rawFile.responseText;
                        let splitLetters = allText.split(" ");
                        let bigArray = [];
                        let littleArray = [];
                        for (let i = 0; i < splitLetters.length; i++) {
                            littleArray.push(splitLetters[i]);
                            if (littleArray.length === 500) {
                                const newObjTwo = {
                                    letters: littleArray,
                                    key: i,
                                };
                                bigArray.push(newObjTwo);
                                littleArray = [];
                            }
                        }
                        setLetters(bigArray);
                    }
                }
            };
            rawFile.send(null);
        }
    });

    if (letters.length === 0) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <h1>Loading World Record Puzzle may take a while...</h1>
                    <Circle color="blue" size={200} />
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.backgroundWorld}>
                    <div className={puzzle.smallNav}>
                        <Link to="/home">Home</Link>
                        <Link to="/worldRecordWords">
                            World Record Words To Find
                        </Link>
                        <p>World Record</p>
                    </div>
                    <ul>
                        {letters.map((line) => (
                            <li key={line.key} className={puzzle.worldRecord}>
                                {line.letters.map((letter) => (
                                    <p>{letter}</p>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }
};

export default WorldRecord;
