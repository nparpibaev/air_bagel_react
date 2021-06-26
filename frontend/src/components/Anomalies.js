import React, {useState} from "react"
import {Paper, withStyles, Button} from "@material-ui/core"
import styles from "../styles/AnomaliesStyles"
import AnomalyProps from "./AnomalyProps";


const anomalies = {
    "Resource": [
        "Skip",
        "Switch",
        "Replace",
        "Incomplete",
        "Rework",
        "Form based",
        "Insert"
    ],
    "System":[
        "Skip",
        "Form based",
        "Cut"
    ],
}


const Anomalies = (props) => {
    const {type, classes, probDist} = props
    const [selectedAnomalies, setSelectedAnomalies] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(anomalies[type].length).fill(false)
    );
    const [checked, setChecked] = useState(false);
    const handleChange = (pos) => {
        const updateCheckedState = checkedState.map((item, index) =>
            index === pos ? !item : item
        );

        setCheckedState(updateCheckedState);
        const totalAnomalies = updateCheckedState.reduce((total, cur, index) => {
            if(cur){
                total.push(anomalies[type][index]);
                return total;
            }
            else {
                return total;
            }
        }, []);

        setSelectedAnomalies(totalAnomalies);

    }

    const handleClick =  () => {
        setChecked(true);

    }

    let checklist = (<div>
                            <ul className={classes.anomaliesList}>
                            {anomalies[type].map((c, i) =>{
                                return (
                                <li key={i} className={classes.listItem}>
                                <div className={classes.anomaliesItem}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checbox-${i}`}
                                        name = {c}
                                        value={c}
                                        checked={checkedState[i]}
                                        onChange={()=>handleChange(i)}
                                    />
                                    <label htmlFor={`custom-checkbox=${i}`}>{c}</label>
                                </div>
                                </li>
                            );
                            })}
                            </ul>
                            <Button 
                                onClick={handleClick}
                                variant="contained"
                                color="primary"
                            >Set</Button>
                     </div>)

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <div>
                <h1>Select the anomaly patterns to generate in the log for {type}</h1>
               { !checked ? 
                    checklist :
                    <AnomalyProps
                     type = {type}
                     probDist = {probDist}
                     selectedAnomalies={selectedAnomalies}
                    />
               }
                </div>
            </Paper>
        </div>
    )
}


export default withStyles(styles)(Anomalies);