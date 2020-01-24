import React, { Component } from 'react';
import Layout from './componenets/Layout/Layout.js';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder.js"
class  App extends Component {
  render(){
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  )
}}
export default App;
