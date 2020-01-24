import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/" active={true}>Checkout</NavigationItem>
    </ul>
);
export default navigationItems;