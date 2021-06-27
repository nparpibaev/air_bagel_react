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
    form : {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    formElement: {
        marginLeft: "1em",
        marginTop: "0.4em"
    },
    select: {
        width: '7em',
        marginLeft: "2em",
    },
    button: {
        marginLeft: "3em",
    },
    doneButton: {
        color: "blue",
        margin: theme.spacing(2),
        marginBottom: theme.spacing(10),
        float: "right",
        right: theme.spacing(62.5),
        
    },

});

export default styles;