import React, {useState} from "react"
import {Paper, withStyles, Button} from "@material-ui/core"
import axios from "axios"
import address from "./address";
import styles from "../styles/AnomaliesStyles"


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
    const [checkedProps, setCheckedProps] = useState(
        new Array(10).fill(false)
    )
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

    const handleClick = async () => {
        let anomaliesAddress = address + "/tool/anomalies";
        let header = {
            'Content-Type': "multi-part/form-data",
            method:"POST",
        }
        let data = new FormData();
        data.append("name", type);
        data.append("probDist",probDist);
        data.append("anomalies",selectedAnomalies);
        const res = await axios.post(anomaliesAddress, data, {headers:header});
        console.log(res);
        
        setChecked(true);

    }

    const handleChangeProps = (pos1, pos2, e) => {
        console.log(checkedProps);
        
        //console.log(checkedProps)
        // const updatedList  = checkedProps.map((item, index)=>{
        //     if(index === pos1) {
        //         item[pos2] = e.target.value;
        //         return item;
        //         console.log(index)
        //     }
        //     else
        //         return item;
        // })
        // setCheckedProps(updatedList);
        // //console.log(selectedAnomalies);
        // console.log(checkedProps)
    }

    let checklist = (<div>
                            <ul className={classes.anomaliesList}>
                            {anomalies[type].map((c, i) =>{
                                return (
                                <li key={i}>
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
    let checkedlist = (<div>
                            <form className={classes.anomaliesList}>
                            {selectedAnomalies.map((c, i) =>{
                                return (
                                <div className={classes.anomaliesItem} key={i}>
                                    <h3>{c}</h3>
                                     <label htmlFor={`custom-input=${i}`}>strength</label>
                                    <input
                                        type="text"
                                        id={`custom-input-${i}`}
                                        name = {c}
                                        //value={checkedProps[i][0]}
                                        onChange={(e) => handleChangeProps(i, 0, e)}
                                        className={classes.input}
                                    />
                                    <label htmlFor={`custom-input=${i}`}>max-length</label>
                                    <input
                                        type="text"
                                        id={`custom-input-${i}`}
                                        name = {c}
                                        //value={checkedProps[i][1]}
                                        onChange={() =>{}}
                                        className={classes.input}
                                        onChange={(e) => handleChangeProps(i, 1, e)}
                                    />
                                    
                                </div>
                                    );
                            })}
                            <Button
                                variant="contained"
                                color="primary"
                            >Set</Button>
                            </form>

                        </div>)

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <>
                <h1>Select the anomaly patterns to generate in the log for {type}</h1>
                <h1>{probDist}</h1>
               { !checked ? 
                    checklist :
                    checkedlist
               }
                </>
            </Paper>
        </div>
    )
}


export default withStyles(styles)(Anomalies);