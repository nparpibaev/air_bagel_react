import React, { useEffect} from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import "./styles/MainPage.css";
export default function MainPage(props) {

    useEffect(()=>{
        fetch('http://localhost:5000/home').then(response =>
          response.json().then(data=> {
            console.log(data);
          })
          );
      }, []);

    return(
        <div className="MainPage">
          <NavBar />
          <div className="welcome">
            <h1>Welcome to AirBagel</h1>
            <p>Easy and simple tool to create 
              pseudo-random anomilies in event logs</p>
          </div>
          <div className="buttonContainer">
            <button type="button" href="/tool" className="btn btn-outline-primary mainButtons btn-lg btn-light" 
            onClick={()=>{props.history.push('/tool')}}>USE IT RIGHT AWAY</button>
            <button type="button" href="/about" className="btn btn-outline-primary mainButtons btn-lg btn-light"
             onClick={()=>{props.history.push('/about')}}>ABOUT THE TOOL</button>
          </div>
          <Footer/>

        </div>
    ); 
    
    }