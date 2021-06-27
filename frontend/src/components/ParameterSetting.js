import { withStyles, Paper, Button } from "@material-ui/core"
import React, {useContext} from "react"
import ResourceSetting from "./ResourceSetting"
import SystemSetting from "./SystemSetting"
import NavBar from "./NavBar"
import Footer from "./Footer"
import address from "./address"
import styles from "../styles/ParameterSettingStyles"
import { ParameterContext } from "../contexts/parameterContext"



const ParameterSetting = (props) => {
    const {classes} =  props

    const {parameters} = useContext(ParameterContext)

    return (
        <div>
            <NavBar/>
        <div className={classes.main}>
            <Paper className={classes.paper}>
                {   parameters["Resource"] &&
                    <ResourceSetting/>
                }
                { parameters["System"] &&
                    <SystemSetting/>
                }
                <Button href={`${address+"/tool/simulate"}`}  variant="contained" color="inherit"
                        >Simulate Now</Button> 
            </Paper>
        </div>
            <Footer/>
        </div>
    )
}



export default withStyles(styles)(ParameterSetting);