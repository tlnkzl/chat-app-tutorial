import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();



const initState = {
    general: [
        {from: 'tulin', msg: 'hello'},
        {from: 'gul', msg: 'hi'},
        {from: 'dave', msg: 'morning'},
    ],
    topic2: [
        {from: 'tulin', msg: 'hello'},
        {from: 'tulin', msg: 'hi'},
        {from: 'tulin', msg: 'morning'},
    ]
}

function reducer(state, action) {
    const {from, msg} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                [action.payload.topic]: [
                    ...state[action.payload.topic],
                    {from, msg} // from: action.payload.from, // msg: action.payload.msg
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
          dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        });
    }

    const user = 'tulin' + Math.random(100).toFixed(2)

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}