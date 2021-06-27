import React, {useEffect, useRef, useState} from "react";
import {Paper, withStyles} from "@material-ui/core";
import Columns from "./Columns";
import address from "./address";
import styles from "../styles/InputStyles";
import axios from "axios";
import SelectDataCols from "./SelectDataCols";

function Input(props) {
const inputFile = useRef(null);
const [isUploaded, setIsUploaded] = useState(false);
const [isFirstMount, setIsFirstMount] = useState(true);
const [canGetColumns, setCanGetColumns] = useState(false);
const {classes} = props;

const handleSubmit = (e) =>{
  e.preventDefault();
  if(inputFile.current.files.length === 0)
    alert("Please upload a file")
  else if(!inputFile.current.files[0].name.includes('.csv'))
    alert("Please upload a csv file");
  else {
  setIsFirstMount(false);
  setIsUploaded(!isUploaded);
  }
};

useEffect(()=>{
  async function fetchData(){
  if(!isFirstMount){
    let file_address = address + '/tool/file';
    let data = new FormData();
    data.append('file', inputFile.current.files[0]);
    let header = {
      'Content-Type': "multipart/form-data",
      method: "POST",
      mode: "no-cors",
    };
    let res = await axios.post(file_address, data, {headers: header});
    setCanGetColumns(true);

  }
}
fetchData()
}, [isUploaded]);


  return (
    <div className={classes.main}>
      <h1>Data import and preprocessing</h1>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h3><label htmlFor="file">Enter a CSV File that you want to change</label></h3>
          <input type="file" id ="inputfile" 
          ref ={inputFile} name="inputfile" />
          <button>Submit</button>
        </form>
      </Paper>
      { canGetColumns && 
        <div>
          <Columns/>
          <SelectDataCols/>
        </div>
      }
      
    </div>
  );
}

export default withStyles(styles)(Input);