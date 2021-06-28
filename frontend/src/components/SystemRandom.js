import { withStyles, Button} from "@material-ui/core"
import React, {useState} from "react"
import styles from "../styles/SystemRandomStyles"
import address from "./address"
import axios from "axios"

const SystemRandom = (props) => {
    const {classes} =  props

    const [inputs, setInputs] = useState(["", "", ""])

    const handleChange = (e, pos) => {
        let temp = []
        for(let i = 0; i < 3; i++) {
            if(pos === i) {
               temp[i] = e.target.value 
            } else {
                temp[i] = inputs[i]
            }
        }
        setInputs(temp)
        console.log(temp)
    }
    const handleSubmit = async () => {
        let parameterAddress = address + "/tool/parameter";
        let header = {
            'Content-Type': "application/json",
            method:"POST",
        }
        let data = {}
        let params = {}
        params["days"] = inputs[0]
        params["min-houts"] = inputs[1]
        params["max-houts"] = inputs[2]
        data["name"] = "System"
        data["probDist"] = "Random (Poisson dist.)"

        data["params"] = params
        const res = await axios.post(parameterAddress, data, {headers:header});
        console.log(res);
    }

    return (
        <div className={classes.main}>
                <h1>System Random Setting</h1>
                <form>
                    <div>
                        <h3>Random (Poisson Process)</h3>
                        <p>(1)Average interval of 'start_timestamp' between system malfunctioning events</p>
                        <label>-1/lambda days = </label>
                        <input
                            id = "days"
                            name = "days"
                            className={classes.input}
                            onChange={(e) => handleChange(e, 0)}
                        />
                        <p>(2) Max/Min duration of system malfunctioning to set 'finish_timestamp'</p>
                        <label>-a(minimum hours) = </label>
                        <input
                            id = "min-hours"
                            name = "min-hours"
                            className={classes.input}
                            onChange={(e) => handleChange(e, 1)}
                        />
                        <label>-b(maximum hours) = </label>
                        <input
                            id = "max-hours"
                            name = "max-hours"
                            className={classes.input}
                            onChange={(e) => handleChange(e, 2)}
                        />
                    </div>
                    <Button variant="contained" color="inherit"
                        onClick={handleSubmit}
                        >Set</Button> 
                </form>
        </div>
    )
}



export default withStyles(styles)(SystemRandom);