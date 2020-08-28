import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import RoomListCard from "./RoomListCard";

const MainScreenFindCreateGame = ({
    changeName,
    createName,
    createGame,
    rooms,
    joinGame,
}) => {
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
                                <RoomListCard
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
};

export default MainScreenFindCreateGame;
