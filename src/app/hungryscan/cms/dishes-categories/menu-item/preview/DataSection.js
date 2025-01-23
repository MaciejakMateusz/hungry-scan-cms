import React, {useEffect} from "react";
import {NameAndDescription} from "./NameAndDescription";
import {Allergens} from "./Allergens";
import {Variants} from "./Variants";
import {Additions} from "./Additions";
import {useDispatch, useSelector} from "react-redux";
import {fetchVariants} from "../../../../../../slices/variantsSlice";
import {Banner} from "./Banner";

export const DataSection = () => {
    const dispatch = useDispatch();
    const {dish} = useSelector(state => state.dishesCategories.view);
    const {fileName} = useSelector(state => state.dishForm.form);

    useEffect(() => {
        dispatch(fetchVariants({dish: dish}));
    }, [dispatch])

    return (
        <section className={`details-data-section ${!fileName ? 'no-image' : ''}`}>
            <div className={'details-data-container'}>
                <Banner/>
                <NameAndDescription/>
                <Allergens/>
                <Variants/>
                <Additions/>
            </div>
        </section>
    );
}