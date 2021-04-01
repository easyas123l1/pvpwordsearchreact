import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function Profile({ email, name }) {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <p>Hi {name} this page is coming soon!</p>
            </div>
        </div>
    );
}
