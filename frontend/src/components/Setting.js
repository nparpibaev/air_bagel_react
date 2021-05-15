import { Paper, withStyles } from '@material-ui/core';
import React from 'react';
import styles from "./styles/SettingStyles";


const Setting = (props) => {
    const  {classes} = props;

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <h1>Root Parameter Setting</h1>
            </Paper>
        </div>
    );
}


export default withStyles(styles)(Setting);