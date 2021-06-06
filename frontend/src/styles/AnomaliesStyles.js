const styles = (theme) => ({
    main: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: '50em',
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
   anomaliesItem: {
       display: "flex",
       justifyContent: "space-between",
   },
   input: {
       maxWidth: "30px",
       maxHeight: "30px",
   },
});

export default styles;