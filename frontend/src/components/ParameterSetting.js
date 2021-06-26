import { withStyles, Paper } from "@material-ui/core"
import React from "react"
import styles from "../styles/ParameterSettingStyles"

const ParameterSetting = (props) => {
    const {classes} =  props

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <h1>This is the parameter setting page</h1>
            </Paper>
        </div>
    )
}



export default withStyles(styles)(ParameterSetting);