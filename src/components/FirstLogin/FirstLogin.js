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
        <div>
            <input
                type="text"
                name="maximumWordSize"
                onChange={changeName}
                value={name}
                className={puzzle.inputField}
            />
            <button onClick={buttonSubmit}>submit name</button>
            <p className={puzzle.puzzleParagraph}>first login wow</p>
        </div>
    );
}
