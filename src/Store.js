import React from 'react';

export const CTX = React.createContext();

/*
    msg {
        from: 'user'
        msg: 'hi'
        topic: 'general'
    }

    state {
        general: [
            {from: 'tulin' msg: 'hello'},
            {from: 'gul' msg: 'hi'},
            {from: 'dave' msg: 'morning'},
        ]
        topic2: [
            {from: 'tulin' msg: 'hello'},
            {from: 'tulin' msg: 'hi'},
            {from: 'tulin' msg: 'morning'},
        ]
    }
*/

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
    const {from, msg, topic} = action.payload;
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

export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState)
    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}