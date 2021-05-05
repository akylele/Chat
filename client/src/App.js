import './App.css';
import useRoutes from '../src/routes'
import {useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Loader from "./components/Basic/Loader";

function App(props) {
    const history = useHistory()
    const routes = useRoutes()

    useEffect(() => {
        if (props.step === 'CHAT') {
            return history.push('/chat')
        } else if (props.step === 'LOGIN') {
            return history.push('/login')
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
