import React, {useCallback, useEffect} from "react";
import {DocumentIcon} from "../../icons/DocumentIcon";
import Select from "react-select";
import {newCustomSelect} from "../../../selectStyles";
import {CustomNoOptionsMessage} from "../cms/form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUserRestaurants, setRestaurant} from "../../../slices/dashboardSlice";

export const DashboardTopper = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.dashboard.restaurants);
    const {restaurant} = useSelector(state => state.dashboard.view);


    const getRestaurantsData = useCallback(
        async () => {
            const resultAction = await dispatch(getUserRestaurants());
            if (getUserRestaurants.fulfilled.match(resultAction)) {
                dispatch(setRestaurant({
                    value: resultAction.payload[0],
                    label: resultAction.payload[0].name
                }))
            }
        }, [dispatch]
    ) 
    
    useEffect(() => {
        getRestaurantsData();
    }, [dispatch, getRestaurantsData]);

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
                        styles={newCustomSelect}
                        components={{NoOptionsMessage: CustomNoOptionsMessage}}
                />
            </div>
            <div className={'options-button'}>
                <ThreeDotsIcon/>
            </div>
        </header>
    );
}