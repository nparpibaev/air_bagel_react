import { withStyles, Paper } from "@material-ui/core"
import React, {useContext} from "react"
import styles from "../styles/ParameterSettingStyles"
import { ParameterContext } from "../contexts/parameterContext"
const ParameterSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)
    console.log(parameters)
    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <h1>This is the parameter setting page</h1>
            </Paper>
        </div>
    )
}



export default withStyles(styles)(ParameterSetting);