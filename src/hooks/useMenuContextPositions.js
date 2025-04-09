import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {setContextMenuDetailsActive} from "../slices/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActiveRemovalType} from "../slices/dishesCategoriesSlice";

export const useMenuContextPositions = () => {
    const {t} = useTranslation();
    const {contextMenuDetailsActive} = useSelector(state => state.menu.form);
    const dispatch = useDispatch();

    return [
        {
            name: t('rename'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => console.log("rename")
        },
        {
            name: t('duplicate'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => console.log("copy")
        },
        {
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setActiveRemovalType('menu'))
        }, {
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setContextMenuDetailsActive(!contextMenuDetailsActive)),
            details: true
        }];
}