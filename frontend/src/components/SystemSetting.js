import { withStyles, Paper } from "@material-ui/core"
import React, {useContext} from "react"
import styles from "../styles/SystemSettingStyles"
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


const SystemSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)


    console.log(parameters)
    return (
        <div className={classes.main}>
                <h1>System</h1>
        </div>
    )
}



export default withStyles(styles)(SystemSetting);