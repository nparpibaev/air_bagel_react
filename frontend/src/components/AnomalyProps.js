import { withStyles, Button } from "@material-ui/core"
import React, {useState} from "react"
import axios from "axios"
import address from "./address"
import styles from "../styles/AnomalyPropsStyles"



const anomaliesTotal = {
    "Resource":{
            "Skip":
                {
                "hasMaxValue": false
                },    
            "Switch":
                {
                "hasMaxValue": false
                },    
            "Replace":
                {
                "hasMaxValue": false
                },    
            "Incomplete":
                {
                    "hasMaxValue": false
                },
            "Rework":
                {
                    "hasMaxValue": true
                },   
            "Form based":
                {
                    "hasMaxValue": true
                },    
            "Insert":
                {
                    "hasMaxValue": true
                },    
    },
    "System": {
            "Skip":
                {
                    "hasMaxValue": false
                },
            "Form based":
                {
                    "hasMaxValue": false
                },    
            "Cut":
                {
                    "hasMaxValue": false
                },    
    }
}


const useInputStateHelper = (len) => {
   let temp = []
   for(let i = 0; i < len; i++) {
       temp.push(new Array(2).fill(""))
   }
    const [inputs, setInputs] = useState(temp)
    return [inputs, setInputs] 
}


const makeFormData = (anomalies, data) => {
    console.log(data)
    let temp = {}
    for(let i = 0; i < anomalies.length; i++) {
        temp[anomalies[i]] = {}
        temp[anomalies[i]]["strength"] = data[i][0]
        if(data[i][1]){
            temp[anomalies[i]]["max-length"] = data[i][1]
        }
    }
    return temp
}

const AnomalyProps = (props) => {
    const {selectedAnomalies, type, probDist, classes} =  props
    const [inputs, setInputs] = useInputStateHelper(selectedAnomalies.length)

    const handleChange = (e, pos1, pos2) => {
        let temp = []
        let len = inputs.length
        for(let i = 0; i < len; i++) {
            if(i !== pos1) {
                temp.push(inputs[i])
            }
            else {
                temp.push(["", ""])
                temp[i][1-pos2] = inputs[i][1-pos2]
                temp[i][pos2] = e.target.value
            }
        }
        setInputs(temp)
        console.log(temp)
    }

    const handleClick = async () => {
        let anomaliesAddress = address + "/tool/anomalies";
        let header = {
            'Content-Type': "application/json",
            method:"POST",
        }
        let data = {}
        data["name"] = type
        data["probDist"] = probDist
        data["anomalies"] = makeFormData(selectedAnomalies, inputs);
        const res = await axios.post(anomaliesAddress, data, {headers:header});
        console.log(res);
        
    }

    let anomalies = <form className={classes.anomaliesList}>
                    {
                        selectedAnomalies.map((item, index) => {
                          return (
                              <div className={classes.anomaliesItem}>
                                  <div className={classes.strength}>
                                    <h3>{item}</h3>
                                    <label className={classes.label}>strength</label>
                                    <input
                                        type="text"
                                        id={`custom-input-${index}`}
                                        name={item}
                                        value={inputs[index][0]}
                                        className={classes.input}
                                        onChange={(e) => handleChange(e, index, 0) }
                                    />
                                   </div>
                                   <div> 
                                    { anomaliesTotal[type][item]["hasMaxValue"] &&
                                    <div className={classes.maxLength}>
                                        <label  className={classes.label}>max-length</label>
                                        <input 
                                            type="text"
                                            id={`custom-input1-${index}`}
                                            name={item}
                                            value={inputs[index][1]}
                                            className={classes.input}
                                            onChange={(e)=> handleChange(e, index, 1)}
                                        />
                                    </div>
                                    }
                                    </div>
                              </div>

                          )
                        })
                    }
                    <Button variant="contained" color="primary"
                        className={classes.doneButton}
                        onClick={handleClick}   
                        >Set</Button>  
                   </form>

    return (
        <div className={classes.main}>
                {anomalies}
        </div>
    )
}



export default withStyles(styles)(AnomalyProps);