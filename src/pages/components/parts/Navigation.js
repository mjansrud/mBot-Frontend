import React, { Component } from 'react';
import { Navbar, Nav,  NavItem} from 'react-bootstrap';
import { login, logout, isLoggedIn } from '../../../utils/AuthService';
import '../../../assets/css/app.css';

class Navigation extends Component {

    render() {
        return (
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">mBot</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {
                        ( !isLoggedIn() ) ?
                            <NavItem eventKey={1} href="/">Home</NavItem> :  ''
                    }
                    {
                        ( isLoggedIn() ) ?
                            <NavItem eventKey={2} href="/dashboard">Dashboard</NavItem> :  ''
                    }
                    {
                        ( isLoggedIn() ) ?
                            <NavItem eventKey={3} href="/settings">Settings</NavItem> :  ''
                    }
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/disclaimer">Disclaimer</NavItem>
                    <NavItem eventKey={2} href="/about">About</NavItem>
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
