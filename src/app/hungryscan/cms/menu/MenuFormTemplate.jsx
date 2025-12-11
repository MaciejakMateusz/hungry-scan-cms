import {NameField} from "../form-components/NameField";
import {setName} from "../../../../slices/menuSlice";
import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {MenuColorField} from "../form-components/MenuColorField";
import {LoadingSpinner} from "../../../icons/LoadingSpinner";
import {BorderedButton} from "../../common/BorderedButton";
import {ActionButton} from "../../common/ActionButton";

export const MenuFormTemplate = ({formHeader, discardHandler, submitHandler, errorData, isLoading}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.menu.form);

    return (
        <>
            <div className={'overlay'}>
                <div className={'form-dialog '}>
                    <div className={'variant-form-dialog-content'}>
                        <div className={'form-dialog-title'}>{formHeader}</div>
                        <NameField id={'menu-name'}
                                   value={name}
                                   onChange={(e) => dispatch(setName(e))}
                                   error={errorData}
                        />
                        <MenuColorField/>
                    </div>
                    <div className={'dialog-footer'}>
                        <BorderedButton onClick={discardHandler}
                                        text={t('cancel')}
                                        isBordered={true}/>
                        <form style={{all: 'unset'}} onSubmit={submitHandler}>
                            <ActionButton type="submit"
                                          text={isLoading ? <LoadingSpinner buttonMode={true}/> : t('save')}>
                            </ActionButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}