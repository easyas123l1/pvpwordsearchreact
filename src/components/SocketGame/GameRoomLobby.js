import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import PlayPuzzle from "./PlayPuzzle";

const GameRoomLobby = ({ room, leaveRoom, serverId }) => {
    // mywords grabs a players words by filtering by id and destructuring first out of array.
    const [myWords] = room.players.filter((player) => serverId === player.id);
    if (myWords) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <PlayPuzzle
                        words={myWords.wordsDir}
                        name={room.name}
                        code={room.puzzle.puzzle}
                    />
                    <button onClick={leaveRoom}>Leave</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>
                        server most likely ran into error/reset please refresh
                        page.
                    </p>
                    <button onClick={leaveRoom}>Leave</button>
                </div>
            </div>
        );
    }
};

export default GameRoomLobby;