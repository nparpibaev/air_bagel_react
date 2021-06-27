import { withStyles } from "@material-ui/core"
import React, {useContext} from "react"
import styles from "../styles/ResourceManualStyles"
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


const ResourceManual = (props) => {
    const {classes} =  props
    return (
        <div className={classes.main}>
                <h1>Resource Manual Setting</h1>
        </div>
    )
}



export default withStyles(styles)(ResourceManual);