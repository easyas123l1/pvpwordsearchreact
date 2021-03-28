import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import { NavLink as Link } from "react-router-dom";
import { Circle } from "react-spinners-css";
import Footer from "../Footer/Footer";

const WorldRecordWords = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        let newWords = [];
        if (words.length === 0) {
            const file1 = require("./words1.txt");
            const file2 = require("./words2.txt");
            const file3 = require("./words3.txt");
            let rawFile1 = new XMLHttpRequest();
            rawFile1.open("GET", file1, false);
            rawFile1.onreadystatechange = () => {
                if (rawFile1.readyState === 4) {
                    if (rawFile1.status === 200 || rawFile1.status === 0) {
                        let allText = rawFile1.responseText;
                        let newText = allText
                            .replace(/(\r\n|\n|\r)/gm, "1")
                            .split("1");
                        newWords = [...newWords, ...newText];
                    }
                }
            };
            rawFile1.send(null);
            let rawFile2 = new XMLHttpRequest();
            rawFile2.open("GET", file2, false);
            rawFile2.onreadystatechange = () => {
                if (rawFile2.readyState === 4) {
                    if (rawFile2.status === 200 || rawFile2.status === 0) {
                        let allText = rawFile2.responseText;
                        let newText = allText
                            .replace(/(\r\n|\n|\r)/gm, "1")
                            .split("1");
                        newWords = [...newWords, ...newText];
                    }
                }
            };
            rawFile2.send(null);
            let rawFile3 = new XMLHttpRequest();
            rawFile3.open("GET", file3, false);
            rawFile3.onreadystatechange = () => {
                if (rawFile3.readyState === 4) {
                    if (rawFile3.status === 200 || rawFile3.status === 0) {
                        let allText = rawFile3.responseText;
                        let newText = allText
                            .replace(/(\r\n|\n|\r)/gm, "1")
                            .split("1");
                        newWords = [...newWords, ...newText];
                    }
                }
            };
            rawFile3.send(null);
            setWords(newWords);
        }
    }, [words.length]);

    if (words.length === 0) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <h1>Loading World Record Words may take a while...</h1>
                    <Circle color="blue" size={200} />
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.backgroundWorldWords}>
                    <div className={puzzle.smallNav}>
                        <Link to="/home">Home</Link>
                        <Link to="/worldRecord">World Record Puzzle</Link>
                        <p>World Record Words</p>
                    </div>
                    <ul className={puzzle.worldWords}>
                        {words.map((word) => (
                            <li key={word} className={puzzle.worldRecordWords}>
                                <p>{word}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }
};

export default WorldRecordWords;
