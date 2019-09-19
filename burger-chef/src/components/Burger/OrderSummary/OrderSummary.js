import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => { 
    const ingredientSummary = Object.keys(props.ingredients)
                .map(igKey => {
                    return (
                    <li key={igKey}>
                            <span style={{textTransform: 'capitalize'}}>{igKey}:</span> 
                            {props.ingredients[igKey]}
                    </li>);
                });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>This tasty burger has the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p>Continue with Checkout?</p>
        </Aux>
    );
};

export default orderSummary;