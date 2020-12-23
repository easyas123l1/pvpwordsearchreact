import React, { useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import axios from "axios";

export default function MatchHistory({ email }) {
    useEffect(() => {
        axios
            .post(
                "https://pvpwordsearc-master-fyw6qrqfuj.herokuapp.com/puzzle/user/history",
                { email }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [email]);
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <p>hi {email}</p>
            </div>
        </div>
    );
}
