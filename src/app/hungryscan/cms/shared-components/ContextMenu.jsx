import React from "react";
import {createPortal} from "react-dom";

export const ContextMenu = ({positions, contextRef, coords}) => {
    if (!coords) return null;

    const renderPositions = () => {
        return (
            positions.map((position) => {
                return (
                    <div key={position.id}>
                        {position.id === 'details' && <div className={'draggable-position-separator'}></div>}
                        <div className={'context-menu-position'}
                             onClick={position.handler}>
                            {position.icon}<span
                            style={position.id === 'remove' ? {color: '#EC5858'} : {}}>{position.name}</span>
                        </div>
                    </div>
                );
            })
        );
    }

    const style = {
        position: "absolute",
        top: coords.top,
        left: coords.left,
        zIndex: 9999,
    };

    return createPortal(
        <div className="context-menu" style={style} ref={contextRef}>
            <div className="context-menu-wrapper">
                {renderPositions()}
            </div>
        </div>,
        document.body
    );
}