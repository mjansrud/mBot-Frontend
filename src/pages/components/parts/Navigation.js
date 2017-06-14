import React, { Component } from 'react';
import {Link} from "react-router";
import { Navbar, Nav,  NavItem} from 'react-bootstrap';
import { login, logout, isLoggedIn } from '../../../utils/AuthService';
import '../../../assets/css/app.css';

class Navigation extends Component {

    render() {
        return (
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">mBot</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {
                        ( !isLoggedIn() ) ?
                            <NavItem eventKey={1}><Link to="/">Home</Link></NavItem> :  ''
                    }
                    {
                        ( isLoggedIn() ) ?
                            <NavItem eventKey={2}><Link to="/dashboard">Dashboard</Link></NavItem> :  ''
                    }
                    {
                        ( isLoggedIn() ) ?
                            <NavItem eventKey={3}><Link to="/settings">Settings</Link></NavItem> :  ''
                    }
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}><Link to="/disclaimer">Disclaimer 2</Link></NavItem>
                    <NavItem eventKey={2}><Link to="/about">about</Link></NavItem>
                    <NavItem eventKey={3} >
                        {
                            (isLoggedIn()) ? ( <button className="btn btn-info log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
                        }
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default Navigation;
