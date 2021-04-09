import React, { useState } from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function FirstLogin({ createName }) {
    const [name, setName] = useState("");

    const changeName = (e) => {
        setName(e.target.value);
    };

    const buttonSubmit = (e) => {
        e.preventDefault();
        createName(name);
    };
    return (
        <div className={puzzle.firstLogin}>
            <p className={puzzle.entername}>Enter a user name: </p>
            <input
                type="text"
                name="maximumWordSize"
                onChange={changeName}
                value={name}
                className={puzzle.inputField}
            />
            <button className={puzzle.submitName} onClick={buttonSubmit}>
                Submit Name
            </button>
        </div>
    );
}
