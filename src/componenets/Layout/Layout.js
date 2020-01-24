import React,{Component} from 'react'
import Aux from '../../hoc/Aux.js'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        let side=this.state.showSideDrawer
        this.setState({showSideDrawer:!side})
    }
    render(){
        return(
            <Aux>
            <Toolbar click={this.sideDrawerClosedHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )
    }
}

export default Layout;