import { withStyles } from "@material-ui/core"
import React, {useContext} from "react"
import SystemManual from "./SystemManual"
import SystemRandom from "./SystemRandom"
import styles from "../styles/SystemSettingStyles"
import { ParameterContext } from "../contexts/parameterContext"



const SystemSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)

    let elem

    if(parameters["System"]) {
        if(parameters["System"] === "Self Configuration") {
            elem = <SystemManual/>
        } else {
            elem = <SystemRandom/> 
        }
    }
    

    return (
        <div className={classes.main}>
                {elem}
        </div>
    )
}



export default withStyles(styles)(SystemSetting);