import React from "react";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {ContextMenu} from "./ContextMenu";

export const RecordOptionsButton = ({
                                        onClick,
                                        style,
                                        contextWindowActive,
                                        contextPositions,
                                        contextRef,
                                        windowPosition,
                                        className,
                                        dotsFill
                                    }) => {
    return (
        <div className={'relative-container'}>
            <div className={className}
                 style={style}
                 tabIndex={-1}
                 onClick={onClick}>
                <ThreeDotsIcon fill={dotsFill}/>
            </div>
            {contextWindowActive &&
                <ContextMenu positions={contextPositions}
                             contextRef={contextRef}
                             windowPosition={windowPosition}/>}
        </div>
    );
}