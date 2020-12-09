import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function Profile({ email, name }) {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <p>hi {name}</p>
            </div>
        </div>
    );
}
