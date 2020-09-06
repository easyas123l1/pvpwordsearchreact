import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";

const PreGameRoomLobby = ({ room, serverId }) => {
    const [host, setHost] = useState(false);

    useEffect(() => {
        if (serverId === room.hostId) {
            setHost(true);
        } else {
            setHost(false);
        }
    }, [room.hostId, serverId]);

    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>inside some lobby WOW!</div>
                <p>players</p>
                <p>roomid {room.id}</p>
                <p>room name {room.name}</p>
                <p>room state {room.state}</p>
                <p>room hostId {room.hostId}</p>
                <p>my id {serverId}</p>
                <p>PUZZLE</p>
                <p>puzzle size {room.puzzle.size}</p>
                <p>puzzle number of words {room.puzzle.numberOfWords}</p>
                <p>puzzle timer {room.puzzle.timer}</p>
                <p>puzzle code {room.puzzle.puzzle}</p>
                <p>user is host? {host ? "true" : "false"}</p>
            </div>
        </div>
    );
};

export default PreGameRoomLobby;
