import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {NameField} from "../form-components/NameField";
import {
    clearForm,
    fetchMenu,
    postMenu,
    setAddMenuFormActive,
    setErrorData,
    setName
} from "../../../../slices/menuSlice";

export const MenuFormDialog = ({isEditForm}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu.fetchMenu);
    const {name} = useSelector(state => state.menu.form);
    const {errorData} = useSelector(state => state.menu.postMenu);

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
            dispatch(setAddMenuFormActive(false));
            dispatch(clearForm());
        }
    }

    const handleFormDiscard = () => {
        dispatch(clearForm());
        dispatch(setAddMenuFormActive(false));
        dispatch(setErrorData({}));
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