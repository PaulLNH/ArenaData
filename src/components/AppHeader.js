import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    withStyles,
} from '@material-ui/core';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';

const styles = {
    flex: {
        flex: 1,
    },
};

const AppHeader = ({ classes }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="title" color="inherit">
                Arena Data
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/posts">Match Manager</Button>
            <div className={classes.flex} />
            <LoginButton />
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(AppHeader);