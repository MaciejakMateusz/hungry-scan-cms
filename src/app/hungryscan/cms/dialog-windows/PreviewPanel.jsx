import React from "react";
import {CloseButton, Header, SidePanel} from "./PreviewPanel.style";
import {useDispatch, useSelector} from "react-redux";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";
import {useTranslation} from "react-i18next";

export const PreviewPanel = ({content}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {previewActive} = useSelector((state) => state.globalParams.globalParams);

    return (
        <SidePanel $previewActive={previewActive}>
            <Header>
                <CloseButton onClick={() => dispatch(setPreviewActive(false))}>{t('close')} ></CloseButton>
            </Header>
            {previewActive && content}
        </SidePanel>
    );
}