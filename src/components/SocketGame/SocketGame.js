import React, { useState } from "react";
import puzzle from "../../styles/puzzle.module.scss";
import PreGameRoomLobby from "./PreGameRoomLobby";
import MainScreenFindCreateGame from "./MainScreenFindCreateGame";
import GameRoomLobby from "./GameRoomLobby";
import GameRoomLobbyStarting from "./GameRoomLobbyStarting";
import { socket } from "../../App";

const initState = {
    players: [],
    id: null,
    name: "",
    state: "",
    puzzle: {
        size: null,
        numberOfWords: null,
        timer: null,
        words: [],
        puzzle: "",
    },
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

    // host started game.
    socket.on("gameStarting", () => {
        const gameRoom = room;
        gameRoom.state = "STARTING";
        setRoom(gameRoom);
    });

    // create game room
    const createGame = (e) => {
        const roomInfo = {
            name: createName,
            size: 20,
            numberOfWords: 30,
            timer: 300,
        };
        socket.emit("createRoom", roomInfo);
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
                if (room.state === "FILLING") {
                    //game not started lfm players
                    return <PreGameRoomLobby />;
                } else if (room.state === "STARTING") {
                    // game is starting coundown!
                    return <GameRoomLobbyStarting />;
                } else if (room.state === "START") {
                    // game has started!
                    return <GameRoomLobby />;
                } else {
                    // default case for state.
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
