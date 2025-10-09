import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RestaurantFormTemplate} from "./RestaurantFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {setErrorMessage,} from "../../../../slices/restaurantSlice";
import {FormHeader} from "../../cms/shared-components/FormHeader";

export const RestaurantFormWrapper = ({onSubmit, onDiscard, title}) => {
    const dispatch = useDispatch();
    const {errorMessage} = useSelector(state => state.restaurant.form);
    const {errorData, isLoading} = useSelector(state => state.restaurant.post);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                {errorMessage ?
                    <FormErrorDialog error={errorData} resetMessage={() => dispatch(setErrorMessage(null))}/> : null}
                <FormHeader formHeader={title}
                            onFormSubmit={onSubmit}
                            onFormDiscard={onDiscard}
                            isLoading={isLoading}
                />
                <div className={'form-grid category'}>
                    <form className={'padded-form-fragment'}>
                        <RestaurantFormTemplate/>
                    </form>
                </div>
            </div>
        </div>
    );
}