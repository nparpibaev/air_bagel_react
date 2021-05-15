import React, {useEffect, useState} from "react";
import {Select, MenuItem, Paper, withStyles, FormLabel} from "@material-ui/core";
import address from "./address";
import styles from "../styles/ColumnStyles.js";
import axios from "axios";


function helper(obj) {
    let table = [];
    let head = [];
    for(let item in obj) {
        head.push(item);
    }
    table.push(head);
    for(let i = 0; i < 10; i++){
        let temp = [];
        for(let item in obj){
            temp.push(obj[item][i]);
        }
        table.push(temp);
    }
    return table;
}

function Columns(props) {
    const {classes} = props;
    const [items, setItems] = useState([]);

    useEffect(async ()=>{
        let column_address = address + "/tool/columns";
        const result = await axios(column_address);
        setItems(result.data);
    }, [])
    let new_items = helper(items);
    return (
        <div className={classes.main}>
        <Paper className={classes.paper}>
            <h3>The data preview</h3>
            <table>
                <tr>
                    {new_items[0].map(cur => <th>{cur}</th>)}
                </tr>
                {new_items.slice(1).map( (c) => { return (<tr> {c.map( (c1) => <td>{c1}</td> ) }</tr>); })}
            </table>
        </Paper>
        </div>
    );
}
export default withStyles(styles)(Columns);