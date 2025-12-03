import React from "react";
import {SidePanel} from "./PreviewPanel.style";
import {useSelector} from "react-redux";
import {ClosePreviewButton} from "./ClosePreviewButton";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";

export const PreviewPanel = ({content, personalizationMode}) => {
    const {previewActive} = useSelector((state) => state.globalParams.globalParams);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 1000;

    return (
        <SidePanel $previewActive={previewActive} $personalizationMode={personalizationMode}>
            {previewActive && content}
            {isMobile && <ClosePreviewButton/>}
        </SidePanel>
    );
}