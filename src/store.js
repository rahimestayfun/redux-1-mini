import {createStore} from 'redux';

const initialState = {
    currentValue:0,
    futureValues:[],
    previousValues:[], 

};
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const UNDO = "UNDO";
export const REDO = "REDO"; 

function reducer(state= initialState, action){
    const {type} = action;
    switch(type){
        case INCREMENT:
            return {
                currentValue: state.currentValue + action.amount,
                //adding the previousValues array by taking the currentValue of the state and adding the beginning of the array.
                previousValues: [state.currentValue, ...state.previousValues],
                futureValues: []
            };
        case DECREMENT: 
            return {
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues],
            };
        case UNDO:
            return {
                currentValue: state.previousValues[0],
                futureValues: [state.currentValue, ...state.futureValues],
                previousValues: state.previousValues.slice(1),
            
            };
        case REDO:
            return {
                currentValue: state.futureValues[0],
                futureValues: state.futureValues.slice(1),
                previousValues: [state.currentValue, ...state.previousValues]
            };
        default:
            return state;
    }

}

export default createStore(reducer);