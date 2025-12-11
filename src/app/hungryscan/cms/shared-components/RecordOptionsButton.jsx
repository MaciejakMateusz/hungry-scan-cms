import React, {useLayoutEffect, useRef, useState} from "react";
import {ThreeDotsIcon} from "../../../icons/ThreeDotsIcon";
import {ContextMenu} from "./ContextMenu";

export const RecordOptionsButton = ({
                                        onClick,
                                        style,
                                        contextWindowActive,
                                        contextPositions,
                                        contextRef,
                                        className,
                                        correctPosition = {y: 0, x: 140},
                                        dotsFill
                                    }) => {
    const buttonRef = useRef(null);
    const [coords, setCoords] = useState(null);

    useLayoutEffect(() => {
        if (contextWindowActive && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();

            setCoords({
                top: rect.bottom + window.scrollY - correctPosition.y,
                left: rect.left + window.scrollX - correctPosition.x
            });
        } else if (!contextWindowActive) {
            setCoords(null);
        }
    }, [contextWindowActive]);

    const handleClick = (e) => {
        onClick?.(e);
    };

    return (
        <div className="relative-container">
            <div
                ref={buttonRef}
                className={className}
                style={style}
                tabIndex={-1}
                onClick={handleClick}
            >
                <ThreeDotsIcon fill={dotsFill} />
            </div>

            {contextWindowActive && (
                <ContextMenu
                    positions={contextPositions}
                    contextRef={contextRef}
                    coords={coords}
                />
            )}
        </div>
    );
}