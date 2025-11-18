import React from "react";
import {CloseButton, SidePanel} from "./PreviewPanel.style";
import {menuAppHost} from "../../../../apiData";
import Iframe from "react-iframe";
import {useDispatch, useSelector} from "react-redux";
import {setPreviewActive} from "../../../../slices/globalParamsSlice";

export const PreviewPanel = ({previewParams}) => {
    const dispatch = useDispatch();
    const {previewActive} = useSelector((state) => state.globalParams.globalParams);

    return (
        <SidePanel $previewActive={previewActive}>
            {previewActive &&
                <>
                    <CloseButton onClick={() => dispatch(setPreviewActive(false))}>></CloseButton>
                    <Iframe url={menuAppHost + previewParams}
                            className={'iframe-container'} styles={{border: 'none'}}/>
                </>
            }
        </SidePanel>
    );
}