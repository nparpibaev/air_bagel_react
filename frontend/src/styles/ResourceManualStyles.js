const styles = (theme) => ({
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
    },
    list: {
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
    },
    listItem: {
        display:"flex",
        justifyContent:"space-between"
    }
});

export default styles;