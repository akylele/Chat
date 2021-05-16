import {useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import {socket} from './socket';
import {loadRoomsStart, newMessagesForRoom, newUsersForRoom, setActiveRoom} from "./redux/actions/rooms";
import {Toast} from "./hooks/message.hook";
import {setStep} from "./redux/actions/ui";

import useRoutes from './routes'
import Loader from "./components/Basic/Loader";

import './App.css';
import {CHAT, LOGIN, PICKUP} from "./redux/action-types";

function App(props) {
    const history = useHistory()
    const routes = useRoutes()
    window.isMobileVersion = window.innerWidth < 768

    socket.off('ROOM:DELETE_ROOM').on('ROOM:DELETE_ROOM', data => {
        Toast(data.message)
        props.setStep(window.isMobileVersion ? PICKUP : CHAT)
        props.setActiveRoom(null)
        props.loadRoomsStart()
    })

    socket.off('ROOM:UPDATE_USERS').on('ROOM:UPDATE_USERS', (data) => {
        console.log('==========>обновляем юзеров')
        props.newUsersForRoom(data)
    })

    socket.off('ROOM:UPDATE_MESSAGES').on('ROOM:UPDATE_MESSAGES', (data) => {
        console.log('==========>обновляем сообщения')
        props.newMessagesForRoom(data)
    })

    socket.off('ROOM:UPDATE_ROOMS').on('ROOM:UPDATE_ROOMS', () => {
        console.log('==========>обновляем комнаты')
        props.loadRoomsStart()
    })

    socket.off('ROOM:JOIN_CREATOR').on('ROOM:JOIN_CREATOR', (text) => {
        Toast(text)
    })

    useEffect(() => {
        if (props.step === PICKUP) {
            return history.push('/pickup')
        } else if (props.step === LOGIN) {
            return history.push('/login')
        } else if (props.step === CHAT) {
            return history.push('/chat')
        }
    }, [props.step])

    return (
        <>
            <Loader/>
            <div className="App">
                {routes}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    step: state.ui.step,
})

const mapDispatchToProps = dispatch => ({
    newUsersForRoom: data => dispatch(newUsersForRoom(data)),
    newMessagesForRoom: data => dispatch(newMessagesForRoom(data)),
    setStep: step => dispatch(setStep(step)),
    setActiveRoom: room => dispatch(setActiveRoom(room)),
    loadRoomsStart: () => dispatch(loadRoomsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
