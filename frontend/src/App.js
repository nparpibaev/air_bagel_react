import React from 'react';
import {Route, Switch} from "react-router-dom";
import ToolPage from './components/ToolPage';
import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';
import Setting from "./components/Setting";
import ParameterSetting from './components/ParameterSetting';
import './App.css';
function App() {
  return (
    <Switch>
      <Route 
        exact
        path="/"
        render={(routeProps) => <MainPage {...routeProps} />}
        />
      <Route 
        exact
        path="/tool/setting"
        render={(routeProps) => <Setting {...routeProps} />}
        />
      <Route 
        exact
        path="/tool/parameter"
        render={(routeProps) => <ParameterSetting {...routeProps} />}
        />
      <Route 
        exact
        path="/tool"
        render={(routeProps) => <ToolPage {...routeProps} />}
        />
      <Route 
        exact
        path="/about"
        render={(routeProps) => <AboutPage {...routeProps} />}
        />
       <Route 
        render={(routeProps) => <MainPage  {...routeProps}/>}
        />
        
    </Switch>
    
  )
}

export default App;