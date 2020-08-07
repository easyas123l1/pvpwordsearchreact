import React, { useState } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import io from "socket.io-client";
import GameLobbyList from "./GameLobbyList";

const socket = io("http://localhost:4999", {
    query: `gapiname=${window.gapi}`,
});

export default function SocketGame() {
    const [createName, setCreateName] = useState("");
    const [rooms, setRooms] = useState([]);

    // greeting message will prolly delete
    socket.on("welcome", (data) => {
        console.log(data);
    });

    // receiving room data
    socket.on("rooms", (data) => {
        console.log(data);
        setRooms(data);
    });

    socket.on("enteredRoom", (data) => {
        console.log(data);
    });

    // create game room
    const createGame = (e) => {
        socket.emit("createRoom", createName);
    };

    // join game room
    const joinGame = (e) => {
        const roomid = e.target.id;
        socket.emit("joinRoom", roomid);
    };

    // change game room name
    const changeName = (e) => {
        setCreateName(e.target.value);
    };

    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>
                    <p>create a lobby</p>
                    <input
                        type="text"
                        name="newGame"
                        onChange={changeName}
                        placeholder="Title the game room!"
                        value={createName}
                        // className={puzzle.space}
                    />
                    <button onClick={createGame}>Create Game</button>
                </div>
                <div>
                    <p>join a lobby</p>
                    <div>
                        {rooms.map((room) => {
                            return (
                                <GameLobbyList
                                    room={room}
                                    joinGame={joinGame}
                                    key={room.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
