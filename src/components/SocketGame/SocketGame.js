import React, { useState } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import GameLobbyList from "./GameLobbyList";
import { socket } from "../../App";

const SocketGame = ({ email, conn, error }) => {
    const [createName, setCreateName] = useState("");
    const [rooms, setRooms] = useState([]);

    // receiving rooms data
    socket.on("rooms", (data) => {
        setRooms(data);
    });

    // enter game room
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
    if (error) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>{error}</div>
            </div>
        );
    } else {
        if (email && conn) {
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
        } else {
            return (
                <div className={puzzle.spacer}>
                    <div className={puzzle.background}>Please login</div>
                </div>
            );
        }
    }
};

export default SocketGame;
