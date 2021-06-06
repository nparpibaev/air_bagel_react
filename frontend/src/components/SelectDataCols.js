import { Paper, withStyles, FormLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import styles from "../styles/SelectDataColStyles";
import address from "./address";


const attrs = ["Case_ID", "Event_ID", "Activity", "Timestamp", "format"];
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
    const [done, setDone] = useState(false);

    const [caseId, setCaseId] = useState("");
    const [eventId, setEventId] = useState('');
    const [activity, setActivity] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [format, setFormat] = useState('');

    const [openCase, setOpenCase] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [openActivity, setOpenActivity] = useState(false);
    const [openTimestamp, setOpenTimestamp] = useState(false);
    const [openFormat, setOpenFormat] = useState(false);

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
        else {
            selections[attrs[4]] = event.target.value;
        }

    }
    const handleClick = () => {
        setDone(!done);
        history.push('/tool/setting');
    }

    useEffect(async () => {
        let select_address = address + "/tool/selecting";
        const myInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/html',
            },
            method: "GET",
        };
        const myRequest = new Request(select_address, myInit);
        fetch(myRequest).then(function(response) {
            return response.json();
        }).then(function(response) {
            setItems(response);
        }).catch(function(e){
            console.log(e);
        });
    }, [])
    
    useEffect(async () => {
        let select_address = address + "/tool/selecting";  
        let header = {
        'Content-Type': "application/json",
        method: "POST",
        mode: "no-cors",
        };
        let res = await axios.post(select_address, selections, {headers: header});
        console.log(res);
        console.log(selections);
        }, [done])

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
                            return  <MenuItem value={c} key={c}>{c}</MenuItem>
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
            <button onClick={handleClick}>Submit</button>

            </Paper>

        </div>
    );
}


export default withStyles(styles)(SelectDataCol);