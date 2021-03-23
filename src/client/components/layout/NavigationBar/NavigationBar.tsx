import React from "react";
import "./NavigationBar.scss";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavigationBar = (): JSX.Element => (
    <div>
        <AppBar position="static" style={{ backgroundColor: "#101726" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                News
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </div>
);

export default NavigationBar;
