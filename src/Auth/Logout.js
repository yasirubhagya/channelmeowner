import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';



class Logout extends Component {

    render() {
       
        return ('');
    }

    componentDidMount(){
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.props.setUserHandle(null);
        this.props.history.push('/')
    }
}

Logout.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    setUserHandle:PropTypes.func.isRequired
};

export default withRouter(Logout);