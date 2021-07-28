import {Button, Box, Avatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"


const useStyles = makeStyles({
    root: {
        width: 800,
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        borderBottom: "1px solid",
        margin: 'auto'
        
    },
    head: {
        marginLeft: 20
    }
})
function Client({client}) {
    const classes = useStyles()
    return (

        <Box className={classes.root}>
            <Avatar src={client.avatar}/>
            <h2 className={classes.head}>
            {client.firstname}{' '}
            {client.lastname} {' '}
            {client.patronymic} 
            </h2>
            <Button  color="secondary" variant="outlined">Удалить</Button>
        </Box>
    )
}

export default Client