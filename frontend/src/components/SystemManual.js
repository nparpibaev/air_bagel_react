import { withStyles} from "@material-ui/core"
import React from "react"
import styles from "../styles/SystemManualStyles"


const SystemManual = (props) => {
    const {classes} =  props
    
    return (
        <div className={classes.main}>
                <h1>System Manual Setting</h1>
        </div>
    )
}



export default withStyles(styles)(SystemManual);