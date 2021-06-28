import { Paper, withStyles, FormLabel, Select, MenuItem } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import styles from "../styles/SelectDataColStyles";
import address from "./address";


const attrs = ["Case_ID", "Event_ID", "Activity", "Timestamp", "format", "Resource", "System"];
const formats = ["","2020-01-02 03:04:05.006" , "2020-01-02 03:04:05",
"2020-01-02 03:04:05.006 PM", "2020-01-02 03:04:05 PM",
"20-01-02 03:04:05.006", "20-01-02 03:04:05",
"20-01-02 03:04:05.006 PM", "20-01-02 03:04:05 PM",
"2020/01/02 03:04:05.006", "2020/01/02 03:04:05",
"2020/01/02 03:04:05.006 PM", "2020/01/02 03:04:05 PM",
"20/01/02 03:04:05.006", "20/01/02 03:04:05",
"20/01/02 03:04:05.006 PM", "20/01/02 03:04:05 PM",
"Self-configuration"];
let selections = {};

function SelectDataCol(props) {

    const {classes} = props;
    const [items, setItems] = useState([]);

    const [caseId, setCaseId] = useState("");
    const [eventId, setEventId] = useState('');
    const [activity, setActivity] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [format, setFormat] = useState('');
    const [resource, setResource] = useState("")
    const [system, setSystem] = useState("")

    const [openCase, setOpenCase] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [openActivity, setOpenActivity] = useState(false);
    const [openTimestamp, setOpenTimestamp] = useState(false);
    const [openFormat, setOpenFormat] = useState(false);
    const [openResource, setOpenResource] = useState(false);
    const [openSystem, setOpenSystem] = useState(false);

    let history = useHistory();

    const handleOpen = (handler) => {
        handler(true);
    }
    const handleClose = (handler) => {
        handler(false);
    }
    const handleChange = (handler, event) => {
        handler(event.target.value);
        if(handler === setCaseId) {
            selections[attrs[0]] = event.target.value;
        }
        else  if(handler === setEventId) {
            selections[attrs[1]] = event.target.value;
        }
        else if(handler === setActivity) {
            selections[attrs[2]] = event.target.value;
        }
        else if(handler === setTimestamp) {
            selections[attrs[3]] = event.target.value;
        }
        else if(handler === setResource) {
            selections[attrs[5]] = event.target.value;
        }
        else if(handler === setSystem) {
            selections[attrs[6]] = event.target.value;
        }
        else {
            selections[attrs[4]] = event.target.value;
        }

    }
    const handleClick = () => {
        async function fetchData(){
            let select_address = address + "/tool/selecting";  
            let header = {
            method: "POST",
            "Content-Type":"application/json"
            };
            console.log(selections)
            let res = await axios.post(select_address, selections, {headers: header});
            console.log(res)
        }
        fetchData()
        history.push('/tool/setting');
    }

    useEffect(() => {
        async function fetchData(){
        let select_address = address + "/tool/selecting";
        let res = await axios.get(select_address)
        setItems(res.data)
        console.log(res)
        }
        fetchData();
    }, [])
    
    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <h1>Set Key Attributes</h1>
            <div className={classes.select}>
                <FormLabel className={classes.label}>Case_ID</FormLabel>
                <Select
                 id="select1"
                 open={openCase}
                 onClose={ () => handleClose(setOpenCase)}
                 onOpen={() => handleOpen(setOpenCase)}
                 value = {caseId}
                 onChange={(e) => handleChange(setCaseId, e)}
                >
                    {
                        items.map((c) => {
                            return  <MenuItem value={c} key={uuidv4()}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>Event_ID</FormLabel>
                <Select
                 id="select2"
                 open={openEvent}
                 onClose={ () => handleClose(setOpenEvent)}
                 onOpen={() => handleOpen(setOpenEvent)}
                 value = {eventId}
                 onChange={(e) => handleChange(setEventId, e)}
                >
                    {
                        items.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>Activity</FormLabel>
                <Select
                 id="select3"
                 open={openActivity}
                 onClose={ () => handleClose(setOpenActivity)}
                 onOpen={() => handleOpen(setOpenActivity)}
                 value = {activity}
                 onChange={(e) => handleChange(setActivity, e)}
                >
                    {
                        items.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>Timestamp</FormLabel>
                <Select
                 id="select4"
                 open={openTimestamp}
                 onClose={ () => handleClose(setOpenTimestamp)}
                 onOpen={() => handleOpen(setOpenTimestamp)}
                 value = {timestamp}
                 onChange={(e) => handleChange(setTimestamp, e)}
                >
                    {
                        items.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>-format</FormLabel>
                <Select
                 id="select5"
                 open={openFormat}
                 onClose={ () => handleClose(setOpenFormat)}
                 onOpen={() => handleOpen(setOpenFormat)}
                 value = {format}
                 onChange={(e) => handleChange(setFormat, e)}
                >
                    {
                        formats.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>Resource</FormLabel>
                <Select
                 id="select6"
                 open={openResource}
                 onClose={ () => handleClose(setOpenResource)}
                 onOpen={() => handleOpen(setOpenResource)}
                 value = {resource}
                 onChange={(e) => handleChange(setResource, e)}
                >
                    {
                        attrs.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className={classes.select}>
                <FormLabel className={classes.label}>System</FormLabel>
                <Select
                 id="select7"
                 open={openSystem}
                 onClose={ () => handleClose(setOpenSystem)}
                 onOpen={() => handleOpen(setOpenSystem)}
                 value = {system}
                 onChange={(e) => handleChange(setSystem, e)}
                >
                    {
                        attrs.map((c) => {
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <button onClick={handleClick}>Submit</button>

            </Paper>

        </div>
    );
}


export default withStyles(styles)(SelectDataCol);