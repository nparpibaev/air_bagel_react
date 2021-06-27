import { withStyles } from "@material-ui/core"
import React, {useState} from "react"
import styles from "../styles/ResourceManualStyles"


const ResourceManual = (props) => {
    const {classes} =  props
    return (
        <div className={classes.main}>
                <h1>Resource Manual Setting</h1>
        </div>
    )
}



export default withStyles(styles)(ResourceManual);