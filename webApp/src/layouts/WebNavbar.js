import React, { Component } from 'react'
import './WebNavbar.css';
import { MenuItems } from './MenuItems';
import { Button } from './Button';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class WebNavbar extends Component {
    state = { clicked: false, menuItems: MenuItems }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    filterByUser(item) {
        console.log(item,this.props.user)
        if ((this.props.user != null) && (item.title == 'Log in' || item.title == 'Sign up')) {
            return false;
        }
        else if ((this.props.user == null) && (item.title == 'User Profile' || item.title == 'Submit Document' || item.title == 'My Submissions')) {
            return false;
        }
        else if((this.props.user != null) && (item.title == 'User Profile' || item.title == 'Submit Document' || item.title == 'My Submissions'))
            return true;
        else {
            return true;
        }

    }

    componentDidMount() {
        this.setState({ ...this.state, menuItems: [...MenuItems.filter((item) => this.filterByUser(item))] })
    }

    render() {
        const handleSingup = () => {
            // Window.href();
            window.location.href = '/singup';
        }
        const handleSingin = () => {
            window.location.href = '/singin';
        }
        const handleLogOut = () => {
            localStorage.removeItem("user");
            window.location.href = '/';
        }

        console.log(this.props.user);
        return (
            <div>
                {(this.props.user && this.props.user.type != "ADMIN") || this.props.user == null || this.props.user == {} ?
                    <nav className="NavbarItems">
                        <h1 className="navbar-logo">ICAF</h1>
                        <div className="menu-icon" onClick={this.handleClick}>
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {this.state.menuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={item.cName} href={item.url} >
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                        {this.props.user == null || this.props.user == {} ?
                            <div>
                                <div className="btn-list">
                                    <Button onclick={handleSingup}>Sign Up</Button>
                                </div>
                                <div className="btn-list">
                                    <Button onclick={handleSingin}>Log In</Button>
                                </div>
                            </div> : <div className="btn-list">
                                <Button onclick={handleLogOut}>Log Out</Button>
                            </div>}
                    </nav> : (null)}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    user: jwt.decode(localStorage.getItem('user'))
})

export default connect(mapStateToProps, null)(WebNavbar);