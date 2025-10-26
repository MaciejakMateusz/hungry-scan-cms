import React from "react";
import {useSelector} from "react-redux";
import {RestaurantFormTemplate} from "./RestaurantFormTemplate";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {FormHeader} from "../../cms/shared-components/FormHeader";
import {setErrorData} from "../../../../slices/restaurantSlice";

export const RestaurantFormWrapper = ({onSubmit, onDiscard, title}) => {
    const {isLoading} = useSelector(state => state.restaurant.post);
    const {errorData} = useSelector(state => state.restaurant.form);

    return (
        <div className={'background'}>
            <div className={'cms-padded-view-container'}>
                <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
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