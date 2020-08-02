import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import io from "socket.io-client";

const socket = io("http://localhost:4999");
// socket.on('connect', )
socket.on("welcome", (data) => {
    console.log(data);
});
export default function SocketGame() {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>
                    <p>hello from socket game</p>
                </div>
            </div>
        </div>
    );
}
