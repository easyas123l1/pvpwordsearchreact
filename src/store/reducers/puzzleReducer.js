import {
  START_PUZZLE,
  SAVE_FAILURE,
  START_SAVE,
  SAVE_SUCCESS,
  GET_PUZZLES,
  PUZZLES_SUCCESS,
  PUZZLES_FAILURE,
  GET_PUZZLE,
  PUZZLE_SUCCESS,
  PUZZLE_FAILURE,
  UPDATE_PUZZLE,
  COMPLETE_PUZZLE,
} from "../actions/puzzleAction";

const initState = {
  title: "",
  words: [],
  size: 10,

  playPuzzleName: "",
  playPuzzleCode: "",
  playPuzzleDescription: "",
  playPuzzleRating: "",
  playPuzzleCreator: "",
  playPuzzleWords: [],
  playPuzzleTime: 0,
  puzzles: [],
  getPuzzle: false,
  getPuzzles: false,
  savePuzzleName: "",
  savePuzzleCode: "",
  savePuzzleDescription: "",
  savePuzzleWords: [],
  isSaving: false,
  errorMessage: "",
};

export const puzzleReducer = (state = initState, action) => {
  switch (action.type) {
    case START_PUZZLE:
      return {
        ...state,
        title: action.payload.newTitle,
        words: action.payload.newWords,
        size: action.payload.newSize,
        errorMessage: "",
      };

    case START_SAVE:
      return {
        ...state,
        isSaving: true,
        errorMessage: "",
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        savePuzzleName: action.payload.puzzle.name,
        savePuzzleCode: action.payload.puzzle.name,
        savePuzzleDescription: action.payload.puzzle.name,
        savePuzzleWords: action.payload.words,
        errorMessage: "",
      };

    case SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
        errorMessage: action.payload,
      };

    case GET_PUZZLES:
      return {
        ...state,
        getPuzzles: true,
        errorMessage: "",
      };

    case PUZZLES_SUCCESS:
      return {
        ...state,
        getPuzzles: false,
        puzzles: action.payload,
        errorMessage: "",
      };

    case PUZZLES_FAILURE:
      return {
        ...state,
        getPuzzles: false,
        errorMessage: action.payload,
      };

    case GET_PUZZLE:
      return {
        ...state,
        getPuzzle: true,
        errorMessage: "",
      };

    case PUZZLE_SUCCESS:
      return {
        ...state,
        getPuzzle: false,
        playPuzzleName: action.payload.puzzle.name,
        playPuzzleCode: action.payload.puzzle.code,
        playPuzzleDescription: action.payload.puzzle.description,
        playPuzzleRating: action.payload.puzzle.rating,
        playPuzzleCreator: action.payload.puzzle.user_id,
        playPuzzleWords: action.payload.words,
        errorMessage: "",
      };

    case PUZZLE_FAILURE:
      return {
        ...state,
        getPuzzle: false,
        errorMessage: action.payload,
      };

    case UPDATE_PUZZLE:
      return {
        ...state,
        errorMessage: "",
        playPuzzleWords: action.payload,
      };

    case COMPLETE_PUZZLE:
      return {
        ...state,
        errorMessage: "",
        playPuzzleTime: action.payload,
      };

    default:
      return {
        ...state,
        errorMessage: "",
      };
  }
};
