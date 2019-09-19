import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


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

            totalPrice: 4, // this is the base price!
            purchasable: false,
            purchasing: false
        }

        updatePurhaseState(ingredients) {
            
            // grab all the keys so we can map to get the value
            const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            } ,0);
            this.setState({purchasable: sum > 0});

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
            this.updatePurhaseState(updatedIngredients);

        }

        removeIngredientHandler = (type) => {
            
            const oldCount = this.state.ingredients[type];
            if (oldCount <= 0 ) {
                return;
            }
            const updatedCount = oldCount - 1;

            const updatedIngredients = { 
                ...this.state.ingredients
            };

            updatedIngredients[type] = updatedCount;

            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurhaseState(updatedIngredients);
        }

        purchaseHandler = () => {
            this.setState({purchasing: true});
        }


    render() {

        const disabledInfo = { 
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>

                <Burger ingredients = {this.state.ingredients } />
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        )
    }
 }


 export default BurgerBuilder;