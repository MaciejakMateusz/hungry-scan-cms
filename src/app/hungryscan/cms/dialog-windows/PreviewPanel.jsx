import React, {useRef} from "react";
import {SidePanel} from "./PreviewPanel.style";
import {useDispatch, useSelector} from "react-redux";
import {ClosePreviewButton} from "./ClosePreviewButton";
import {useWindowWidth} from "../../../../hooks/useWindowWidth";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";

export const PreviewPanel = ({content, personalizationMode}) => {
    const dispatch = useDispatch();
    const {previewActive} = useSelector((state) => state.globalParams.globalParams);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 1000;
    const useContextRef = useRef(null);

    useOutsideClick(useContextRef,
        () => dispatch(setPreviewActive(false)),
        previewActive);

    return (
        <SidePanel $previewActive={previewActive}
                   $personalizationMode={personalizationMode}
                   ref={isMobile ? useContextRef : null}>
            {previewActive && content}
            {isMobile && <ClosePreviewButton/>}
        </SidePanel>
    );
}