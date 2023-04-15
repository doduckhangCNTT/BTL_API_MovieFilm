import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: "url(https://images.unsplash.com/photo-1535016120720-40c646be5580?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)"}}>
            <div className="footer__content container">
                <div className="footer__content__logo" >
                    <div className="logo" >
                        <h3>@</h3>
                        <Link to="/" >tMovies</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu" >
                        <Link to="/" >Home</Link>
                        <Link to="/" >Contact us</Link>
                        <Link to="/" >Term of services</Link>
                        <Link to="/" >About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Footer
