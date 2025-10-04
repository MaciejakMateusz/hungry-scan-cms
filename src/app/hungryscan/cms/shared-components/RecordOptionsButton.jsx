import React from "react";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {ContextMenu} from "./ContextMenu";

export const RecordOptionsButton = ({
                                        onClick,
                                        contextWindowActive,
                                        contextPositions,
                                        obj,
                                        detailsActive,
                                        contextRef,
                                        windowPosition,
                                        className,
                                        dotsFill
                                    }) => {
    return (
        <div className={'relative-container'}>
            <div className={className}
                 tabIndex={-1}
                 onClick={onClick}>
                <ThreeDotsIcon fill={dotsFill}/>
            </div>
            {contextWindowActive &&
                <ContextMenu positions={contextPositions}
                             obj={obj}
                             detailsActive={detailsActive}
                             contextRef={contextRef}
                             windowPosition={windowPosition}/>}
        </div>
    );
}