import { Button, Checkbox, FormControl, MenuItem, Paper, Select, withStyles } from '@material-ui/core';
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Anomalies from "./Anomalies";
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
        history.push('/tool/parameter'); 
    }
    return (
        <div>
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
        <Button variant="contained" color="inherit"
                        className={classes.doneButton}
                        onClick={handleClickDone}
                        >Done</Button>  
        </div>
    );
}


export default withStyles(styles)(Setting);