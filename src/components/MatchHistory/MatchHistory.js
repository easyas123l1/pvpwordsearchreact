import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function MatchHistory({ email }) {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <p>hi {email}</p>
            </div>
        </div>
    );
}
