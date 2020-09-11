import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

const GameRoomLobby = ({ room, leaveRoom }) => {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>inside some lobby game started! WOW!</div>
                <p>players</p>
                <p>roomid {room.id}</p>
                <p>room name {room.name}</p>
                <p>room state {room.state}</p>
                <p>room hostId {room.hostId}</p>
                <p>PUZZLE</p>
                <p>puzzle size {room.puzzle.size}</p>
                <p>puzzle number of words {room.puzzle.numberOfWords}</p>
                <p>puzzle timer {room.puzzle.timer}</p>
                <p>puzzle code {room.puzzle.puzzle ? "true" : "false"}</p>
                <button onClick={leaveRoom}>Leave</button>
            </div>
        </div>
    );
};

export default GameRoomLobby;
