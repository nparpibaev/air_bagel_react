import React from "react";
import {withStyles} from "@material-ui/core";
import styles from "../styles/FooterStyles";

function Footer(props) {
    const {classes} = props;
    return (
        <div className={classes.footer}>

        </div>
    )
}

export default withStyles(styles)(Footer);