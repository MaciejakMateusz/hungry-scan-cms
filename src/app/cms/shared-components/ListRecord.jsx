import React from "react";
import {getTranslation} from "../../../locales/langUtils";
import {HorizontalPill} from "./HorizontalPill";

export const ListRecord = (props) => {
    return (
        <>
            <div className={'details-container variants'}>
                <div className={'display-order'}>{props.displayOrder}</div>
                <div className={'details-record-grid'}>
                    <span className={'grid-column-left'}>{getTranslation(props.name)}</span>
                    <span className={'grid-column-right'}>+ {props.price.toFixed(2)} zł</span>
                </div>
            </div>
            <HorizontalPill available={props.available}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
            />
        </>
    );
}