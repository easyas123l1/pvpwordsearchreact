import React, { useState } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import PreGameRoomLobby from "./PreGameRoomLobby";
import MainScreenFindCreateGame from "./MainScreenFindCreateGame";
import GameRoomLobby from "./GameRoomLobby";
import { socket } from "../../App";

const initState = {
    players: [],
    id: null,
    name: "",
    state: "",
};

const SocketGame = ({ email, conn, error, serverId }) => {
    const [createName, setCreateName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(initState);

    // receiving rooms data
    socket.on("rooms", (data) => {
        setRooms(data);
    });

    // enter game room
    socket.on("roomInfo", (data) => {
        setRoom(data);
    });

    // game room ended due to host leaving only happens before games start.
    socket.on("lobbyClosedHostLeft", () => {
        setRoom(initState);
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
    // error means already logged into account
    if (error) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>{error}</div>
            </div>
        );
    } else {
        // logged in good connection!
        if (email && conn) {
            // in a game room
            if (room.id) {
                // game started
                if (room.state !== "FILLING") {
                    return <GameRoomLobby />;
                } else {
                    //game not started lfm players
                    return <PreGameRoomLobby />;
                }
            } else {
                //not in a game room
                return (
                    <MainScreenFindCreateGame
                        changeName={changeName}
                        createName={createName}
                        createGame={createGame}
                        rooms={rooms}
                        joinGame={joinGame}
                    />
                );
            }
        } else {
            // not logged in with google/server.
            return (
                <div className={puzzle.spacer}>
                    <div className={puzzle.background}>Please login</div>
                </div>
            );
        }
    }
};

export default SocketGame;
