import React, {useCallback, useEffect} from "react";
import {DocumentIcon} from "../../icons/DocumentIcon";
import Select from "react-select";
import {mainSelectIcon} from "../../../selectStyles";
import {CustomNoOptionsMessage} from "../cms/form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentRestaurant, getUserRestaurants, setRestaurant} from "../../../slices/dashboardSlice";

export const DashboardTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.dashboard.getRestaurants);
    const {restaurant} = useSelector(state => state.dashboard.view);

    const getRestaurant = useCallback(
        async () => {
            const resultAction = await dispatch(getCurrentRestaurant());
            if (getCurrentRestaurant.fulfilled.match(resultAction)) {
                dispatch(setRestaurant({
                    value: resultAction.payload,
                    label: resultAction.payload?.name
                }))
            }
        }, [dispatch]
    );

    useEffect(() => {
        getRestaurant();
    }, [dispatch, getRestaurant]);

    useEffect(() => {
        dispatch(getUserRestaurants());
    }, [dispatch]);

    return (
        <header className={'app-header dashboard'}>
            <div className={'app-header-select-wrapper'}>
                <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                <Select id={'dashboard-restaurant'}
                        name={'dashboard-restaurant'}
                        value={restaurant}
                        placeholder={t('choose')}
                        options={restaurants}
                        defaultValue={restaurants && restaurants[0]}
                        onChange={(selected) => dispatch(setRestaurant(selected))}
                        styles={mainSelectIcon}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </div>
            <div className={'options-button'}>
                <ThreeDotsIcon/>
            </div>
        </header>
    );
}