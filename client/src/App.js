import './App.css';
import useRoutes from '../src/routes'
import {useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Loader from "./components/Basic/Loader";
import socket from './socket';

function App(props) {
    const history = useHistory()
    const routes = useRoutes()
    window.isMobileVersion = window.innerWidth < 768

    window.socket = socket;

    useEffect(() => {
        if (props.step === 'CHAT') {
            return history.push('/pickup')
        } else if (props.step === 'LOGIN') {
            return history.push('/login')
        } else if(props.step === 'CHAT'){
            return history.push('/chat')
        }
    },[props.step])

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
    step: state.ui.step
})

export default connect(mapStateToProps, null)(App)
