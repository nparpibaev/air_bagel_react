import { withStyles } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import address from "./address"
import axios from "axios"
import styles from "../styles/ResourceManualStyles"


const ResourceManual = (props) => {
    const {classes} =  props


    useEffect(() => {
        async function fetchData(){
        let manual_address = address + "/tool/parameter";
        let res = await axios.get(manual_address)
        console.log(res.data)
        }
        fetchData();
    }, [])

    return (
        <div className={classes.main}>
                <h1>Resource Manual Setting</h1>
        </div>
    )
}



export default withStyles(styles)(ResourceManual);