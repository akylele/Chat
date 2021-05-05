import {connect} from "react-redux";

import './loader.css'

const Loader = (props) => {

    if (!props.userLoader && !props.chatsLoader) {
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

const mapStateToProps = state => ({
    userLoader: state.user.loading,
    chatsLoader: state.chats.loading,
})

export default connect(mapStateToProps, null)(Loader)