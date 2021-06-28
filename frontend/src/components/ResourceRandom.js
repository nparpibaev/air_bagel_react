import { withStyles, Button } from "@material-ui/core"
import React, {useState} from "react"
import axios from "axios"
import address from "./address"
import styles from "../styles/ResourceRandomStyles"



const resourceRandomProbs = [
    {"name": "Random (Exponential dist.)",
     "params":   ["lambda"],
    },
    {"name": "Random (Normal dist.)",
     "params":   ["mean", "std dev"],
    },
    {"name": "Random (Uniform dist.)",
     "params":   ["a", "b"],
    }
]



const makeDataHelper = (inputs) => {
    let temp = {}
    temp["name"] = "Resource"
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i][1] !== "") {
            temp["probDist"] = resourceRandomProbs[i]["name"]
            let tempElem = []
            for(let j = 1; j < inputs[i].length; j++) {
                tempElem[j-1] = {}
                tempElem[j-1][resourceRandomProbs[i]["params"][j-1]] = inputs[i][j]
            }
            temp["params"] = tempElem
        }
    }
    return temp
}

const ResourceRandom = (props) => {
    const {classes} =  props
    const [inputs, setInputs] = useState(new Array(resourceRandomProbs.length).fill(["", "", ""]))

    const handleChange = (e, pos1, pos2) => {
        let temp = []
        for(let i = 0; i < inputs.length; i++) {
            if(pos1 !== i) {
                temp[i] = inputs[i]
            } else {
                let tempElem = []
                for(let j = 0; j < 3; j++){
                    if(pos2 !==j) {
                        tempElem[j] = inputs[i][j]
                    } else {
                        tempElem[j] = e.target.value
                    }
                }
                temp[i] = tempElem
            }
        }
        setInputs(temp)
        console.log(temp)
    }

    const handleSubmit = async () => {
        let parameterAddress = address + "/tool/parameter";
        let header = {
            'Content-Type': "application/json",
            method:"POST",
        }
        let data = {}
        let temp = makeDataHelper(inputs)
        data["name"] = temp["name"]
        data["probDist"] = temp["probDist"]
        data["params"] = temp["params"]
        const res = await axios.post(parameterAddress, data, {headers:header});
        console.log(res);
        
    }
    return (
        <div className={classes.main}>
                <h1>Resource Random Setting</h1>
                <form>
                    {
                        resourceRandomProbs.map((item, index)=>{
                            return (
                                <div className={classes.item}>
                                    <input 
                                        type="checkbox"
                                        name = {item["name"]}
                                        onChange={(e) => handleChange(e, index, 0)}
                                        className={classes.checkbox}
                                    />
                                    <label>{item["name"]}</label>
                                    {item["params"].map((c, i) => {
                                        return (
                                            <>
                                                <label>{c}</label>
                                                <input
                                                    name={c}
                                                    id = {c+item["name"]}
                                                    onChange={(e)=> handleChange(e, index, i+1) }
                                                    className={classes.input}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                 <Button variant="contained" color="inherit"
                        onClick={handleSubmit}
                        >Set</Button> 
                </form>
        </div>
    )
}



export default withStyles(styles)(ResourceRandom);