import React from "react";
import {AdditionRecord} from "../shared-components/AdditionRecord";

export const LetterGroup = ({letter, ingredients}) => {

    return (
        <div className={'letter-group-container'}>
            <div className={'letter-group-header'}>
                {letter}
            </div>
            <div className={'letter-group-content'}>
                {ingredients?.map(ingredient => (
                    <AdditionRecord key={ingredient.id}
                                    ingredient={ingredient}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    available={ingredient.available}
                    />))
                }
            </div>
        </div>
    );
}