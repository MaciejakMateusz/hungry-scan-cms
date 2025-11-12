import React from "react";

export const ContextMenu = ({positions, contextRef, windowPosition}) => {

    const renderPositions = () => {
        return (
            positions.map((position) => {
                return (
                    <div key={position.id}>
                        {position.id === 'details' && <div className={'draggable-position-separator'}></div>}
                        <div className={'context-menu-position'}
                             onClick={position.handler}>
                            {position.icon}<span style={position.id === 'remove' ? {color: '#EC5858'} : {}}>{position.name}</span>
                        </div>
                    </div>
                );

            })
        );
    }

    return (
        <div className={'context-menu'} style={windowPosition} ref={contextRef}>
            <div className={'context-menu-wrapper'}>
                {renderPositions()}
            </div>
        </div>
    );
}