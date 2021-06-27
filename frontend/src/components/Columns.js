import React, {useEffect, useState} from "react";
import {Paper, withStyles} from "@material-ui/core";
import address from "./address";
import { v4 as uuidv4 } from 'uuid';
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

    useEffect( ()=>{
        async function fetchData() {
        let column_address = address + "/tool/columns";
        const result = await axios(column_address);
        setItems(result.data);
        }
        fetchData()
    }, [])
    let new_items = helper(items);
    return (
        <div className={classes.main}>
        <Paper className={classes.paper}>
            <h3>The data preview</h3>
            <table>
                <thead>
                    <tr>
                        {new_items[0].map(cur => <th key={uuidv4()}>{cur}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {new_items.slice(1).map( (c) => { return (<tr key={uuidv4()}> {c.map( (c1) => <td key={uuidv4()}>{c1}</td> ) }</tr>); })}
                </tbody>
            </table>
        </Paper>
        </div>
    );
}
export default withStyles(styles)(Columns);