import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
};

export const START_PUZZLE = "START_PUZZLE";

// this sends the user created puzzle to Redux
export const generatePuzzle = puzzle => dispatch => {
  dispatch({ type: START_PUZZLE, payload: puzzle });
};

export const START_SAVE = "START_SAVE";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAILURE = "SAVE_FAILURE";

// axios call to save puzzle
export const reduxSavePuzzle = puzzle => dispatch => {
  dispatch({ type: START_SAVE });
  console.log(puzzle);
  axiosWithAuth()
    .post("https://backend-word-search.herokuapp.com/api/puzzle", puzzle)
    .then(res => {
      return dispatch({ type: SAVE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      console.log(err.data);
      console.log(err.message);
      console.log(err.response);
      dispatch({ type: SAVE_FAILURE, payload: err });
    });
};

export const GET_PUZZLES = "GET_PUZZLES";
export const PUZZLES_SUCCESS = "PUZZLES_SUCCESS";
export const PUZZLES_FAILURE = "PUZZLES_FAILURE";

// axios call to get all puzzles
export const getPuzzles = () => dispatch => {
  dispatch({ type: GET_PUZZLES });

  axios
    .get("https://backend-word-search.herokuapp.com/api/puzzle")
    .then(res => {
      return dispatch({ type: PUZZLES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: PUZZLES_FAILURE, payload: err.response.data.message });
    });
};

export const GET_PUZZLE = "GET_PUZZLE";
export const PUZZLE_SUCCESS = "PUZZLE_SUCCESS";
export const PUZZLE_FAILURE = "PUZZLE_FAILURE";

// axios call to get individual puzzle info words, code, description, name
export const getPuzzle = id => dispatch => {
  dispatch({ type: GET_PUZZLE });

  axios
    .get(`https://backend-word-search.herokuapp.com/api/puzzle/${id}`)
    .then(res => {
      return dispatch({ type: PUZZLE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: PUZZLE_FAILURE, payload: err });
    });
};

export const UPDATE_PUZZLE = "UPDATE_PUZZLE";
export const UPDATE_PUZZLE_SUCCESS = "UPDATE_PUZZLE_SUCCESS";
export const UPDATE_PUZZLE_FAILURE = "UPDATE_PUZZLE_FAILURE";

// axios call to update users progress on puzzle
export const updatePuzzle = words => dispatch => {
  dispatch({ type: UPDATE_PUZZLE, payload: words });
  // will eventually call axios.
};

export const COMPLETE_PUZZLE = "COMPLETE_PUZZLE";

export const completePuzzle = time => dispatch => {
  dispatch({ type: COMPLETE_PUZZLE, payload: time });
};
