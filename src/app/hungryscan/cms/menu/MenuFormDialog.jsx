import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {NameField} from "../form-components/NameField";
import {
    clearForm,
    fetchMenu,
    postMenu,
    setErrorData,
    setMenuFormActive,
    setName,
    setNewMenuCreated
} from "../../../../slices/menuSlice";
import {fetchActiveMenu} from "../../../../slices/cmsSlice";

export const MenuFormDialog = ({isEditForm}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu.fetchMenu);
    const {name} = useSelector(state => state.menu.form);
    const {errorData} = useSelector(state => state.menu.postMenu);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);

    useEffect(() => {
        dispatch(fetchMenu());
    }, []);

    useEffect(() => {
        const existingMenu = {id: menu?.id, name: menu?.name}
        dispatch(setName(existingMenu.name));
    }, [dispatch, menu]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(postMenu({menu: {id: menu?.id, name: name}}));
        if (postMenu.fulfilled.match(resultAction)) {
            await dispatch(fetchActiveMenu());
            await dispatch(setMenuFormActive(false));
            dispatch(clearForm());
            dispatch(setNewMenuCreated(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setNewMenuCreated(false))
            }, 4000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);
        }
    }

    const handleFormDiscard = async () => {
        await dispatch(setMenuFormActive(false));
        dispatch(clearForm());
        dispatch(setErrorData(null));
    }

    return (
        <>
            <div className={'overlay'}></div>
            <div className={'variant-form-dialog '}>
                <div className={'variant-form-dialog-content'}>
                    <h4>
                        {isEditForm ? t('editMenu') : t('addMenu')}
                    </h4>
                    <NameField id={'menu-name'}
                               value={name}
                               onChange={(e) => dispatch(setName(e))}
                               error={errorData}
                    />
                </div>
                <div className={'variant-dialog-footer'}>
                    <button className={'general-button cancel'} onClick={handleFormDiscard}>
                        {t('cancel')}
                    </button>
                    <form style={{all: 'unset'}} onSubmit={handleFormSubmit}>
                        <button type="submit" className={'general-button'}>{t('save')}</button>
                    </form>
                </div>

            </div>
        </>
    );
}