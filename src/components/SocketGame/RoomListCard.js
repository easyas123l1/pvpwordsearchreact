import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

// time to make the rooms look better!
export default function RoomListCard({ room, joinGame }) {
    console.log(room);
    const [host] = room.players.filter((player) => room.hostId === player.id);
    return (
        <div className={puzzle.joinGameBox}>
            <p>HOST: {host.email} </p>
            <p>NAME: {room.name} </p>
            <p>MAXIMUM WORD SIZE: {room.puzzle.maximumWordSize} </p>
            <p>MINIMUM WORD SIZE: {room.puzzle.minimumWordSize} </p>
            <p>NUMBER OF WORDS: {room.puzzle.numberOfWords} </p>
            <p>
                PUZZLE DIMENSIONS: {room.puzzle.size}x{room.puzzle.size}
            </p>
            <p>TIMER(seconds): {room.puzzle.timer}</p>
            <button id={room.id} onClick={joinGame}>
                Join
            </button>
        </div>
    );
}
