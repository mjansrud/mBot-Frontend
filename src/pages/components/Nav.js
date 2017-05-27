import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import '../../assets/css/app.css';

class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">mBot</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        {
                            ( !isLoggedIn() ) ? <Link to="/">Home</Link> :  ''
                        }

                    </li>
                    <li>
                        {
                            ( isLoggedIn() ) ? <Link to="/dashboard">Dashboard</Link> :  ''
                        }
                    </li>
                    <li>
                        {
                            ( isLoggedIn() ) ? <Link to="/settings">Settings</Link> :  ''
                        }
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        {
                            (isLoggedIn()) ? ( <button className="btn btn-info log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
