import React from 'react';
import classes from "./Toolbar.module.css"
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
const Toolbar=(props)=>(
<header className={classes.Toolbar}>
    <div className={classes.DrawerToggle} onClick={props.click} >
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div style={{height:"80%"}}>
    <Logo/>
    </div>
    <nav class={classes.DesktopOnly}>
        <NavigationItems/>
    </nav>
</header>
);
export default Toolbar;