import React from "react";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";
import Footer from "../Footer/Footer";

const Victory = ({ name, time }) => {
  return (
    <div className={puzzle.spacer}>
      <div className={puzzle.background}>
        <div>
          <p>
            Completed puzzle {name} in {time}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    name: state.puzzleReducer.playPuzzleName,
    time: state.puzzleReducer.playPuzzleTime,
  };
}

export default connect(mapStateToProps, {})(Victory);
