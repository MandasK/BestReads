import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import BRIcon from "../Images/BRIcon.png"
import { UserProfileContext } from '../providers/UserProfileProvider';
import "./header.css"

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    
    return (
        <div>
            <Navbar className="navbarColor" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/"><img src={BRIcon} alt="logo" className="headerImageNavBar" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                        <>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/myProfile">My Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/books/search">Book Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/users/">Find Friends</NavLink>
                        </NavItem>
                        </>
                        
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                        <>
                        <NavItem>
                            <a aria-current="page" className="nav-link"
                                style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                        </NavItem>
                        </>
                        }
                        {!isLoggedIn &&
                        <>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                        </NavItem>
                        </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}