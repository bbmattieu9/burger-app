import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'; 

const controls = [ 
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

function outputPrice(amount) {
    return Number.parseFloat(amount).toFixed(2);
};

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p>Current Price: ${outputPrice(props.price)} </p>
        { controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}  label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)} 
                disabled={props.disabled[ctrl.type]}
             />
        ) )}
    </div>
);

export default buildControls;