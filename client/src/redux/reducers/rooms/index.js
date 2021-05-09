const initialState = {
    activeRoom: null,
    filteredRooms: null,
    rooms: [],
    loading: false
}
export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case "DELETE_ROOM_SUCCESS":
            return {
                ...state,
                loading: false
            }
        case "DELETE_ROOM_ERROR":
            return {
                ...state,
                loading: false,
            }
        case "DELETE_ROOM_START":
            return {
                ...state,
                loading: true
            }
        case "LOAD_ROOMS_SUCCESS":
            return {
                ...state,
                rooms: action.payload,
                loading: false
            }
        case "LOAD_ROOMS_ERROR":
            return {
                ...state,
                loading: false,
            }
        case "LOAD_ROOMS_START":
            return {
                ...state,
                loading: true
            }
        case "LOAD_ROOM_BY_ID_SUCCESS":
            const newRooms = state.rooms.map(room => {
                if (room._id === action.payload._id) {
                    room = action.payload
                }

                return room
            })
            return {
                ...state,
                rooms: newRooms,
                loading: false
            }
        case "LOAD_ROOM_BY_ID_ERROR":
            return {
                ...state,
                loading: false,
            }
        case "LOAD_ROOM_BY_ID_START":
            return {
                ...state,
                loading: true
            }
        case "NEW_USERS_FOR_ROOM":
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (room => room._id === action.payload.roomId) {
                        room.users = action.payload.users
                    }

                    return room
                })
            }
        case "NEW_MESSAGES_FOR_ROOM":
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (room => room._id === action.payload.roomId) {
                        room.messages = action.payload.messages
                    }

                    return room
                })
            }
        case "SET_ACTIVE_ROOM":
            return {
                ...state,
                activeRoom: action.payload
            }
        case "SET_FILTERED_ROOMS":
            return {
                ...state,
                filteredRooms: action.payload
            }
        case "CREATE_ROOM_START":
            return {
                ...state,
                loading: true
            }
        case "CREATE_ROOM_SUCCESS":
            return {
                ...state,
                loading: false
            }
        case "CREATE_ROOM_ERROR":
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}


// [
//     {
//         id: 0,
//         title: 'первый чат',
//         lastMessage: 'тратат',
//         counter: 4,
//         dateOfLastMessage: Date.now(),
//         usersOnline: [
//             {
//                 logo: '',
//                 name: 'Витя'
//             }, {
//                 logo: '',
//                 name: 'Паша'
//             },
//         ],
//         messages: [
//             {
//                 from: 'Боря',
//                 date: Date.now(),
//                 text: 'Мы открываем бизнес — мы будем делать бабки'
//             }, {
//                 date: Date.now(),
//                 text: 'Мы купим себе шмотки, и мы купим себе тапки'
//             }, {
//                 from: 'Витя',
//                 date: Date.now(),
//                 text: 'Мы будем делать всё, пока ты пашешь на полставки'
//             },
//         ]
//     }, {
//     id: 1,
//     title: 'второй чат',
//     lastMessage: 'привет',
//     counter: 7,
//     dateOfLastMessage: Date.now(),
//     usersOnline: [
//         {
//             logo: '',
//             name: 'Боря'
//         }, {
//             logo: '',
//             name: 'Витя'
//         },
//     ],
//     messages: [
//         {
//             from: 'Боря',
//             date: Date.now(),
//             text: 'Мы открываем бизнес — мы будем делать бабки'
//         }, {
//             date: Date.now(),
//             text: 'Мы купим себе шмотки, и мы купим себе тапки'
//         }, {
//             from: 'Витя',
//             date: Date.now(),
//             text: 'Мы будем делать всё, пока ты пашешь на полставки'
//         }, {
//             from: 'Боря',
//             date: Date.now(),
//             text: 'Мы открываем бизнес — мы будем делать бабки'
//         }, {
//             date: Date.now(),
//             text: 'Мы купим себе шмотки, и мы купим себе тапки'
//         }, {
//             from: 'Витя',
//             date: Date.now(),
//             text: 'Мы будем делать всё, пока ты пашешь на полставки'
//         },
//     ]
// }, {
//     id: 2,
//     title: 'третий чат',
//     lastMessage: 'нужны бабки?',
//     counter: 10,
//     dateOfLastMessage: Date.now(),
//     usersOnline: [
//         {
//             logo: '',
//             name: 'Боря'
//         }, {
//             logo: '',
//             name: 'Паша'
//         },
//     ],
//     messages: [
//         {
//             from: 'Боря',
//             date: Date.now(),
//             text: 'Мы открываем бизнес — мы будем делать бабки'
//         }, {
//             date: Date.now(),
//             text: 'Мы купим себе шмотки, и мы купим себе тапки'
//         }, {
//             from: 'Витя',
//             date: Date.now(),
//             text: 'Мы будем делать всё, пока ты пашешь на полставки'
//         }, {
//             from: 'Витя',
//             date: Date.now(),
//             text: 'Мы будем делать всё, пока ты пашешь на полставки'
//         }
//     ]
// }
// ]