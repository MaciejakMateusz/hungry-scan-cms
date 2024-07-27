import React from "react";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";

export const HorizontalPill = (props) => {
    return (
        <div className={'manage-buttons-horizontal-pill'}>
            <div className={'hover-scaling'}>
                {props.available ? <AvailableIcon/> : <UnavailableIcon/>}
            </div>
            <div>
                <div className={'clickable-icon hover-scaling'}
                     onClick={props.onEdit}>
                    <EditIcon/>
                </div>
            </div>
            <div className={'clickable-icon hover-scaling'}
                 onClick={props.onDelete}>
                <DeleteIcon/>
            </div>
        </div>
    );
}