import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import MatchCard from "./MatchCard";
import axios from "axios";

export default function MatchHistory({ email }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios
            .post(
                "https://pvpwordsearc-master-fyw6qrqfuj.herokuapp.com/puzzle/user/history",
                { email }
            )
            .then((res) => {
                console.log(res);
                setHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [email]);
    if (history.length > 0) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>hi {email}</p>
                    {history.map((puzzles) => {
                        return <MatchCard key={puzzles.id} puzzle={puzzles} />;
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
