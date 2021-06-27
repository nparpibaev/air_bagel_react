const styles = (theme) => ({
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: '50em',
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    anomaliesList: {
        width: "100%"
    },
   anomaliesItem: {
       width:"90%",
       marginLeft: theme.spacing(5),
       marginRight: theme.spacing(5),
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-between",
   },
   strength: {
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between"
   },
   maxLength: {
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between"
   },
   input: {
       maxWidth: "100px",
       maxHeight: "30px",
   },
   label: {
       marginLeft: theme.spacing(5),
       marginRight: theme.spacing(2),
       marginTop: theme.spacing(1)
   }
});

export default styles;