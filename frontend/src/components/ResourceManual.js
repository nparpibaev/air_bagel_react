import { withStyles, Button } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import address from "./address"
import axios from "axios"
import styles from "../styles/ResourceManualStyles"



const makeDataHelper = (items, inputs) => {
    let temp = {}
    for(let i = 0; i < items.length; i++) {
        temp[items[i]] = inputs[i]
    }
    return temp
}

const ResourceManual = (props) => {
    const {classes} =  props

    const [items, setItems] = useState([])
    const [inputs, setInputs] = useState([])

    const handleChange = (e, pos) => {
        let temp = []
        for(let i = 0; i < items.length; i++){
            if(!inputs[i]) {
                if(i!== pos) {
                    temp[i] = ""
                } else {
                    temp[i] = e.target.value
                }
            } else{
                if(i!==pos) {
                    temp[i] = inputs[i]
                } else {
                    temp[i] = e.target.value
                }
            }
        }
        setInputs(temp)
    }
    
    useEffect(() => {
        async function fetchData(){
        let manual_address = address + "/tool/parameter";
        let res = await axios.get(manual_address)
        setItems(res.data)
        }
        fetchData();
    }, [])


    const handleSubmit = async () => {
        let parameterAddress = address + "/tool/parameter";
        let header = {
            'Content-Type': "application/json",
            method:"POST",
        }
        let data = {}
        let temp = makeDataHelper(items, inputs)
        data["name"] = "Resource"
        data["probDist"] = "Manual Setting"
        data["params"] = temp
        const res = await axios.post(parameterAddress, data, {headers:header});
        console.log(res);
        
    }
    return (
        <div className={classes.main}>
                <h1>Resource Manual Setting</h1>
                <form className={classes.list}>
                    { items.map((item, index) => {
                        return (<div className={classes.listItem}>
                                <label>{item}</label>
                                <input
                                    name = {item}
                                    // value = {1 / items.length}
                                    onChange={(e)=> handleChange(e, index)}
                                />

                                </div>
                        )
                    }) }
                 <Button variant="contained" color="inherit"
                        onClick={handleSubmit}
                        >Set</Button> 
                </form>
        </div>
    )
}



export default withStyles(styles)(ResourceManual);