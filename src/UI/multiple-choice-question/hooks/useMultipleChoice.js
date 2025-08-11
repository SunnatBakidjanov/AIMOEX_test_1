import { useReducer } from 'react';

const initialState = {
    selected: null,
    isSubmitted: false,
    isCorrect: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SELECT_OPTION':
            return {
                ...state,
                selected: action.payload,
            };

        case 'SUBMIT':
            if (!state.selected) return state;
            return {
                ...state,
                isSubmitted: true,
                isCorrect: state.selected === action.correctAnswer,
            };

        case 'RESET_ATTEMPT':
            return {
                ...state,
                isSubmitted: false,
                selected: null,
            };
        default:
            return state;
    }
}

export function useMultipleChoice() {
    const questionData = {
        question: 'Какой год основания JavaScript?',
        options: ['1995', '1990', '2000', '1997'],
        correctAnswer: '1995',
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const selectOption = option => {
        dispatch({ type: 'SELECT_OPTION', payload: option });
    };

    const submitAnswer = () => {
        dispatch({ type: 'SUBMIT', correctAnswer: questionData.correctAnswer });
    };

    const resetAttempt = () => {
        dispatch({ type: 'RESET_ATTEMPT' });
    };

    return {
        ...state,
        questionData,
        selectOption,
        submitAnswer,
        resetAttempt,
    };
}
