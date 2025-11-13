import React from "react";
import {ConfirmationMessagesRenderer} from "./ConfirmationMessagesRenderer";
import {DetailsDialog} from "../cms/dialog-windows/DetailsDialog";

export const GlobalRenderingPlugin = () => {
    return (
        <>
            <ConfirmationMessagesRenderer/>
            <DetailsDialog/>
        </>
    );
};