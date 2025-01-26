import React, {useState} from "react";
import {DocumentIcon} from "../../icons/DocumentIcon";
import Select from "react-select";
import {newCustomSelect} from "../../../styles";
import {CustomNoOptionsMessage} from "../cms/form-components/CustomNoOptionsMessage";
import {ThreeDotsIcon} from "../../icons/ThreeDotsIcon";
import {useTranslation} from "react-i18next";

export const DashboardTopper = () => {
    const {t} = useTranslation();
    const testOptions = [
        {
            value: 'Dom Retro Pivnica',
            label: 'Dom Retro Pivnica'
        },
        {
            value: 'Restauracja 2',
            label: 'Restauracja 2'
        },
        {
            value: 'Restauracja 3',
            label: 'Restauracja 3'
        }
    ];
    const [chosenRestaurant, setChosenRestaurant] = useState(testOptions[0]);

    return (
        <header className={'app-header dashboard'}>
            <div className={'app-header-select-wrapper'}>
                <DocumentIcon customColor={"#9746FF"} absolute={true}/>
                <Select id={'dashboard-restaurant'}
                        name={'dashboard-restaurant'}
                        value={chosenRestaurant}
                        placeholder={t('choose')}
                        options={testOptions}
                        defaultValue={chosenRestaurant}
                        onChange={(selected) => setChosenRestaurant(selected)}
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