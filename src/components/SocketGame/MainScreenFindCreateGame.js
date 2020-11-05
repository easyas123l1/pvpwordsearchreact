import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import RoomListCard from "./RoomListCard";

const MainScreenFindCreateGame = ({
    changeGameObj,
    createGameObj,
    createGame,
    rooms,
    joinGame,
}) => {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>
                    <p>Create a lobby...</p>
                    <p>Name</p>
                    <input
                        type="text"
                        name="name"
                        onChange={changeGameObj}
                        placeholder="Title the game room!"
                        value={createGameObj.name}
                        className={puzzle.inputField}
                    />
                    <p>Size</p>
                    <input
                        type="number"
                        name="size"
                        onChange={changeGameObj}
                        value={createGameObj.size}
                        className={puzzle.inputField}
                    />
                    <p>Number of Words</p>
                    <input
                        type="number"
                        name="numberOfWords"
                        onChange={changeGameObj}
                        value={createGameObj.numberOfWords}
                        className={puzzle.inputField}
                    />
                    <p>Time in seconds</p>
                    <input
                        type="number"
                        name="timer"
                        onChange={changeGameObj}
                        value={createGameObj.timer}
                        className={puzzle.inputField}
                    />
                    <p>Minimum word length</p>
                    <input
                        type="number"
                        name="minimumWordSize"
                        onChange={changeGameObj}
                        value={createGameObj.minimumWordSize}
                        className={puzzle.inputField}
                    />
                    <p>Maximum word length</p>
                    <input
                        type="number"
                        name="maximumWordSize"
                        onChange={changeGameObj}
                        value={createGameObj.maximumWordSize}
                        className={puzzle.inputField}
                    />
                    <p>------------</p>
                    <button
                        onClick={createGame}
                        className={puzzle.createGameButton}
                    >
                        Create Lobby
                    </button>
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
