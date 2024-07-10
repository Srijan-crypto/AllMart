import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'
// import { SearchIcon } from './searchIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const options = {
    burgerColorHover: "#eb4034",
    // burgerColor: "crimson",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link4Text: <FontAwesomeIcon icon={faUser} />,
    link3Text: <FontAwesomeIcon icon={faSearch} />,
    link1Url: "/",
    link2Url: "/products",
    link4Url: "/login",
    link3Url: "/Search",
    link1Size: "1.5vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-end",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    // link2Margin: "5vmax",
    // link3Margin: "2vmax",
    // link3Padding: "3vmax",
    link1Padding: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    // searchIcon: "true",
    // searchIconSize: "10vmax",
    // // SearchIconElement: "<FontAwesomeIcon icon={faSearch} />",
    // SearchIconElement: "FontAwesomeIcon",
    // searchIconProps: "icon: faSearch",
    // // SearchIconElement: "text",
    // cartIcon: "true",
    // CartIconElement: "div",
    // profileIcon: "true",
    // ProfileIconElement: "div",
  };
// const x = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>;
const Header = () => {
  return (
    <ReactNavbar {...options}/>
  )
}

export default Header