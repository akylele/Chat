import './App.css';
import useRoutes from '../src/routes'
import {useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Loader from "./components/Basic/Loader";
import {socket} from './socket';
import {loadRoomsStart, newUsersForRoom, setActiveRoom} from "./redux/actions/rooms";
import {Toast} from "./hooks/message.hook";
import {setStep} from "./redux/actions/ui";

function App(props) {
    const history = useHistory()
    const routes = useRoutes()
    window.isMobileVersion = window.innerWidth < 768

    useEffect(() => {
        socket.on('ROOM:DELETE_ROOM', data => {
            Toast(data.message)
            props.setStep(window.isMobileVersion ? 'PICKUP' : 'CHAT')
            props.setActiveRoom(null)
            props.loadRoomsStart()
        })

        socket.on('ROOM:UPDATE_USERS', (data) => {
            console.log('==========>обновляем юзеров')
            props.newUsersForRoom(data)
        })
    },[])
    
    useEffect(() => {
        if (props.step === 'PICKUP') {
            return history.push('/pickup')
        } else if (props.step === 'LOGIN') {
            return history.push('/login')
        } else if (props.step === 'CHAT') {
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
    activeRoom: state.rooms.activeRoom,
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    newUsersForRoom: data => dispatch(newUsersForRoom(data)),
    setStep: step => dispatch(setStep(step)),
    setActiveRoom: room => dispatch(setActiveRoom(room)),
    loadRoomsStart: () => dispatch(loadRoomsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
