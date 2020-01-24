import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from '../../componenets/Burger/Burger';
import BuildControls from '../../componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../componenets/UI/Spinner/Spinner';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{ 
state={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:1,
    purchasable:false,
    purchasing:false,
    loading:false
}
updatePurchaseState=(ingredients)=> {
const sum=Object.keys(ingredients).map((igKey)=>{
    return ingredients[igKey]
}).reduce((sum,el)=>{
    return sum+el;
},0)
this.setState({purchasable:sum>0});
}

addIngredientHandler=(type)=>{
    const updatedIngredients={...this.state.ingredients}
    updatedIngredients[type]=this.state.ingredients[type]+1;
    const newPrice=this.state.totalPrice+INGREDIENT_PRICES[type]
    this.setState({
        totalPrice:newPrice,
        ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
}
removeIngredientHandler=(type)=>{
    const updatedIngredients={...this.state.ingredients}
    if(this.state.ingredients[type]===0)
    {
        return;
    }
    updatedIngredients[type]=this.state.ingredients[type]-1;
    const newPrice=this.state.totalPrice-INGREDIENT_PRICES[type]
    this.setState({
        totalPrice:newPrice,
        ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
}
purchaseHandler=()=>{
    this.setState({purchasing:true})
}
purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
}
purchaseContinueHandler=()=>
{
    this.setState({loading :true})
    const order={
        ingredients:this.state.ingredients,
        price:this.state.totalPrice,
        customer:{
            name:"vidit chopra",
            address:{
                street:'10/c singar nagar',
                zipCode:'226005',
                country:'India'
            },
            email:'test@test.com'
        },
        deliveryMethod:'fastest'
    }
    axios.post('/orders.json',order).then(response=>{
    this.setState({loading:false,purchasing:false})}).catch(
        // error=>console.log(error))
        this.setState({loading:false,purchasing:false}))
}
render(){
    const disabledInfo={
        ...this.state.ingredients
    }
    for(let key in disabledInfo)
    {
        disabledInfo[key]=(disabledInfo[key]<=0)
    }
    let orderSummary=<OrderSummary 
    price={this.state.totalPrice}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinue={this.purchaseContinueHandler}
    ingredients={this.state.ingredients}/>

    if(this.state.loading){
        orderSummary=<Spinner/>
    }
    return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Aux>
        )
}
}
export default BurgerBuilder;