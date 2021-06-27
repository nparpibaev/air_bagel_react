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
   anomaliesItem: {
       marginLeft: theme.spacing(10),
       marginRight: theme.spacing(25),
       display: "flex",
       justifyContent: "space-between",
   },
   listItem: {
    listStyle: "none"
   },
   input: {
       maxWidth: "30px",
       maxHeight: "30px",
   },
});

export default styles;