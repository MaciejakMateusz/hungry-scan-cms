import React from "react";
import {SidePanel} from "./PreviewPanel.style";
import {useSelector} from "react-redux";

export const PreviewPanel = ({content}) => {
    const {previewActive} = useSelector((state) => state.globalParams.globalParams);

    return (
        <SidePanel $previewActive={previewActive}>
            {previewActive && content}
        </SidePanel>
    );
}