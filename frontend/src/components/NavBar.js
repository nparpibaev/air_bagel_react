import React from "react"
import "./styles/NavBar.css";
export default function NavBar() {
//The source: https://codepen.io/Coding_Journey/pen/GXYbjw
    return (
        <div className="NavBar">
            <nav className="navbar">
                <a href="/home" className="navbar-brand"><span>A</span>ir<span>B</span>agel</a>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/tool">Tool</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
                <button className="navbar-toggler" onClick={()=>{
                    const navbarToggler = document.querySelector(".navbar-toggler");
                    const navbarMenu = document.querySelector(".navbar ul");
                    navbarToggler.classList.toggle("open-navbar-toggler");
                    navbarMenu.classList.toggle("open");
                    }}  >
                    <span></span>
                </button>
            </nav>
        </div>
    );
}