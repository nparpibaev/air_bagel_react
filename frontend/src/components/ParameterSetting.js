import { withStyles, Paper } from "@material-ui/core"
import React, {useContext} from "react"
import ResourceSetting from "./ResourceSetting"
import SystemSetting from "./SystemSetting"
import styles from "../styles/ParameterSettingStyles"
import { ParameterContext } from "../contexts/parameterContext"


const systemProbs = [
    "Manual setting",
    "Random (Exponential dist.)",
    "Random (Normal dist.",
    "Random (Uniform dist.)"
]

const systempProbs = [
    "Manual setting",
    "Random (Poisson)"
]


const ParameterSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)


    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                {   parameters["Resource"] &&
                    <ResourceSetting/>
                }
                { parameters["System"] &&
                    <SystemSetting/>
                }
            </Paper>
        </div>
    )
}



export default withStyles(styles)(ParameterSetting);