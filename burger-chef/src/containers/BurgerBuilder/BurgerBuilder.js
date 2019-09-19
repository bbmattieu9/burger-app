import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
        salad: 0.5,
        bacon: 0.7,
        cheese: 0.4,
        meat: 1.3
};

 class BurgerBuilder extends Component {

        state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },

            totalPrice: 4 // this is the base price!
        }

        addIngredientHandler = (type) => { 
            // Grab the oldCount for a type of Ingredient e.g Salad, Meat etc..
            const oldCount = this.state.ingredients[type];

            // Increment the old Count with 1 each time
            const updatedCount = oldCount + 1;

            // state should be updated in an immutable way..so copy the old state 
            // of the ingredients into a new OBJ so as not to alter the original
            const updatedIngredients = { 
                ...this.state.ingredients
            };

            // Set new value for updated Ingredient
            updatedIngredients[type] = updatedCount;

            // Now lets update the price..
            // we r doing this because all ingredient has a default price

            // First get the default price for a particular type of Ingredient
            const additionPrice = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + additionPrice;

            // Set new state for totalPrice and Ingredients
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        }

        removeIngredientHandler = (type) => {

        }


    render() {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients } />
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler} />
            </Aux>
        )
    }
 }


 export default BurgerBuilder;