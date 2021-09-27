import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import './Header.css';
import logo from './../../images/POLYDEV.svg';
import logo_mobile from './../../images/Logo_mobile.svg';
import arrow from './../../images/arrow.svg'
import {openHandle} from "./../../redux/sliceReducer";

const Header = () => {
    const active = useSelector(state => state.slice.active);
    let history = useHistory();
    const navText = ['О студии', 'Кейсы', 'Контакты']
    const navTextMobile = ['Главная', 'О студии', 'Портфолио', 'Контакты']
    const [screen, setScreen] = useState(window.matchMedia('(max-width: 880px)').matches);
    const dispatch = useDispatch();

    let showText = navText.map((text, i) => <p key={i}><a href={`#${i}`}>{text}</a></p>);
    let showTextMobile = navTextMobile.map((text, i) => <p key={i}><a href={`#${i}`}>{text}<img src={arrow} alt=""/></a>
    </p>);

    useEffect(() => {
        const handler = e => setScreen(e.matches);
        window.matchMedia('(max-width: 880px)').addListener(handler)
    });

    const mainPage = () => {
        history.push('/')
    };

    const adaptiveHeader = () => {
        if (active) {
            document.body.style.overflow = 'visible'
        } else {
            document.body.style.overflow = 'hidden'
        }
        return (
            <div className='container'>
                <div className="header_mobile mobile_wrapper">
                    <div className="logo" onClick={mainPage}>
                        <img src={logo_mobile} alt="logo"/>
                    </div>
                    <div className={active ? "burger" : "burger".concat(' active')}
                         onClick={() => dispatch(openHandle())}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={active ? "wallpaper" : "wallpaper".concat(' active')}>
                    <div className={active ? "menu-burger" : "menu-burger".concat(' active')}>
                        <div className="navBar item_wrapper">
                            {
                                showTextMobile
                            }
                        </div>
                        <div className="headerNavLink mobile_wrapper">
                            <div className="headerLink">
                                <a href="#">Instagram</a>
                                <a href="#">Dribble</a>
                            </div>
                        </div>
                        <div className="mobile_button">
                            <div className="mobile_wrapper">
                                <button>Заполнить бриф</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div>
            {
                screen ? adaptiveHeader()
                    :
                    <div className="header wrapper">
                        <div className="logo" onClick={mainPage}>
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className={active ? "burger" : "burger".concat(' active')} onClick={() => openHandle()}>
                            <span></span>
                        </div>
                        <div className={active ? "menu-burger" : "menu-burger".concat(' active')}>
                            <div className="navBar">
                                {
                                    showText
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Header;