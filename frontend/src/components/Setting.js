import { Button, Checkbox, FormControl, MenuItem, Paper, Select, withStyles } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Anomalies from "./Anomalies";
import NavBar from './NavBar';
import Footer from './Footer';
import { ParameterContext } from '../contexts/parameterContext';
import styles from "../styles/SettingStyles";


const probs = ["Random", "Self Configuration"];


const Setting = (props) => {
    const  {classes} = props;

    const [systemCheck, setSystemCheck] = useState(true);
    const [resourceCheck, setResourceCheck] = useState(true);
    const [openResource, setOpenResource] = useState(false);
    const [openSystem, setOpenSystem] = useState(false);
    const [resourceProb, setResourceProb] = useState("Random");
    const [systemProb, setSystemProb] = useState("Random");

    const [anomalyResource, setAnomalyResource] = useState(false);
    const [anomalySystem, setAnomalySystem] = useState(false);

    const {setParameters} = useContext(ParameterContext)
    let history = useHistory()

    const handleChange = (event, handler) => {
        handler(event.target.checked);
        console.log(resourceCheck, systemCheck);
    }

    const handleClickResource = () => {
        setAnomalyResource(true);        
        console.log(resourceProb);
    }

    const handleClickSystem = () => {
        setAnomalySystem(true);
        console.log(systemProb);
    }

    const handleClickDone = () => {
        let temp = {}
        if (resourceCheck === true) {
            temp["Resource"] = resourceProb
        }
        if(systemCheck) {
            temp["System"] = systemProb
        }
        setParameters(temp)
        history.push('/tool/parameter'); 
    }
    return (
        <div>
            <NavBar/>
        <div className={classes.main}>
            <Paper className={classes.paper}>
                    <h1>Root Parameter Setting</h1>
                    <h2>Resource</h2>
                    <FormControl className={classes.form}
                    >
                        <Checkbox
                        defaultChecked
                        color="primary"
                        onChange = {(e) => handleChange(e, setResourceCheck)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                       <h4 className={classes.formElement}> Failure rate of Resource</h4>
                       <Select className={classes.select}
                       id="select1"
                       open ={openResource}
                       onOpen={() =>setOpenResource(true)}
                       onClose={() => setOpenResource(false)}
                       value = {resourceProb}
                       onChange={(e) => setResourceProb(e.target.value)}
                       
                       >
                            {probs.map((cur) => <MenuItem value={cur} key={cur}>{cur}</MenuItem>)}
                       </Select>
                       <Button variant="contained" color="primary"
                       className={classes.button}
                       onClick={handleClickResource}
                       >Set</Button>

                    </FormControl>
                    <h2>System</h2>
                    <FormControl className={classes.form}>
                        <Checkbox
                        defaultChecked
                        color="primary"
                        onChange = {(e) => handleChange(e, setSystemCheck)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                         <h4 className={classes.formElement}>System Malfunctioning</h4>
                        <Select className={classes.select}
                        id="select2"
                        open ={openSystem}
                        onOpen={() =>setOpenSystem(true)}
                        onClose={() => setOpenSystem(false)}
                        value = {systemProb}
                        onChange={(e) => setSystemProb(e.target.value)}
                        
                        >
                                {probs.map((cur) => <MenuItem value={cur} key={cur}>{cur}</MenuItem>)}
                        </Select>
                        <Button variant="contained" color="primary"
                        className={classes.button}
                        onClick={handleClickSystem}
                        >Set</Button>  
                    </FormControl>
            </Paper>
            { anomalyResource && <Anomalies type="Resource" probDist={resourceProb} /> }
            { anomalySystem && <Anomalies type="System" probDist={systemProb} /> }
        </div>
        <div>
        <Button variant="contained" color="inherit"
                        className={classes.doneButton}
                        onClick={handleClickDone}
                        >Done</Button>  
        </div>
        <Footer />
        </div>
    );
}


export default withStyles(styles)(Setting);