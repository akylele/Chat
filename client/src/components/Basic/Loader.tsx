import {connect} from "react-redux";

import './loader.css'

const Loader = (props: { userLoader: boolean; roomsLoader: boolean; }) => {

    if (!props.userLoader) {
        return null
    }

    return (
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

const mapStateToProps = (state: { user: { loading: boolean; }; rooms: { loading: boolean; }; }) => ({
    userLoader: state.user.loading,
    // roomsLoader: state.rooms.loading,
})

export default connect(mapStateToProps, null)(Loader)