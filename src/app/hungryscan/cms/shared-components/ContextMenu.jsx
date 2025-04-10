import {useSelector} from "react-redux";
import {ContextMenuDetails} from "./ContextMenuDetails";

export const ContextMenu = ({positions, obj}) => {
    const {contextMenuDetailsActive} = useSelector(state => state.menu.form);

    const renderPosition = (p) => {
        if(obj?.standard && p.id === 'remove') return;
        if (p.details) {
            return (
                <div key={p.id}
                     className={'context-menu-position properties'}
                     onMouseOver={p.handler}
                     onMouseLeave={p.handler}>
                    {p.icon}{p.name}
                </div>);
        }
        return (
            <div key={p.id}
                 className={'context-menu-position'}
                 onClick={p.handler}>{p.icon}{p.name}
            </div>);
    }

    return (
        <div className={'context-menu'}>
            <div className={'context-menu-wrapper'}>
                {positions.map((p) => renderPosition(p))}
            </div>
            {contextMenuDetailsActive && <ContextMenuDetails obj={obj}/>}
        </div>
    );
}