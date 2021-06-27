import { withStyles } from "@material-ui/core"
import React, {useContext} from "react"
import ResourceManual from "./ResourceManual"
import ResourceRandom from "./ResourceRandom"
import styles from "../styles/ResourceSettingStyles"
import { ParameterContext } from "../contexts/parameterContext"


const ResourceSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)

    let elem

    if(parameters["Resource"]) {
        if(parameters["Resource"] === "Self Configuration") {
            elem = <ResourceManual/>
        } else {
            elem = <ResourceRandom/> 
        }
    }

    console.log(parameters)
    
    return (
        <div className={classes.main}>
                {elem}
        </div>
    )
}



export default withStyles(styles)(ResourceSetting);