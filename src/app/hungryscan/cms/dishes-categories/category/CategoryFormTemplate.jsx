import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setAvailable, setName} from "../../../../../slices/categoryFormSlice";
import {NameField} from "../../form-components/NameField";
import {LogicalToggleField} from "../../form-components/LogicalToggleField";

export const CategoryFormTemplate = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {name, available, errorData} = useSelector(state => state.categoryForm.form);

    return (
        <>
            <NameField id={"category-name"}
                       value={name}
                       onChange={(e) => dispatch(setName(e))}
                       error={errorData}/>
            <LogicalToggleField id={'available'}
                                name={t('availability')}
                                value={available}
                                onChange={() => dispatch(setAvailable(!available))}/>
        </>
    );
}