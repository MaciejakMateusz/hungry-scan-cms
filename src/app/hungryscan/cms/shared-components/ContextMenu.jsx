import {ContextMenuDetails} from "./ContextMenuDetails";

export const ContextMenu = ({positions, obj, detailsActive, contextRef, position}) => {

    const renderPosition = (position) => {
        if (position.details) {
            return (
                <div key={position.id}
                     className={'context-menu-position properties'}
                     onMouseOver={position.handler}
                     onMouseLeave={position.handler}>
                    {position.icon}{position.name}
                </div>);
        }
        return (
            <div key={position.id}
                 className={'context-menu-position'}
                 onClick={position.handler}>{position.icon}{position.name}
            </div>);
    }

    return (
        <div className={'context-menu'} style={position} ref={contextRef}>
            <div className={'context-menu-wrapper'}>
                {positions.map((p) => renderPosition(p))}
            </div>
            {detailsActive && <ContextMenuDetails obj={obj}/>}
        </div>
    );
}