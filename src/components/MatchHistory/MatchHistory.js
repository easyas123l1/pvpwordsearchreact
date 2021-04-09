import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import MatchCard from "./MatchCard";
import PuzzleView from "./PuzzleView";
import axios from "axios";

export default function MatchHistory({ email }) {
    const [history, setHistory] = useState([]);
    const [puzzleVisibile, setPuzzleVisibile] = useState(false);
    const [puzzleView, setPuzzleView] = useState([]);

    const viewPuzzle = (puzzle) => {
        setPuzzleVisibile(true);
        setPuzzleView(puzzle);
    };

    const leavePuzzle = () => {
        setPuzzleVisibile(false);
        setPuzzleView([]);
    };

    useEffect(() => {
        axios
            .post(
                "https://pvpwordsearc-master-fyw6qrqfuj.herokuapp.com/puzzle/user/history",
                // "http://localhost:4999/puzzle/user/history",
                { email }
            )
            .then((res) => {
                setHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [email]);
    if (puzzleVisibile) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <PuzzleView
                        puzzle={puzzleView}
                        leavePuzzle={leavePuzzle}
                        email={email}
                    />
                </div>
            </div>
        );
    }
    if (history.length > 0) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>hi {email}</p>
                    {history.map((puzzles) => {
                        return (
                            <MatchCard
                                key={puzzles.id}
                                puzzle={puzzles}
                                viewPuzzle={viewPuzzle}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>hi {email}</p>
                </div>
            </div>
        );
    }
}
