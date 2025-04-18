import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {setContextMenuDetailsActive, setRemovalActive} from "../slices/restaurantSlice";

export const useRestaurantContextPositions = () => {
    const {t} = useTranslation();
    const {contextMenuDetailsActive} = useSelector(state => state.restaurant.form);
    const dispatch = useDispatch();

    return [
        {
            id: 'rename',
            name: t('rename'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => console.log("rename")
        },
        {
            id: 'duplicate',
            name: t('duplicate'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => console.log("copy")
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setRemovalActive(true))
        },
        {
            id: 'details',
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setContextMenuDetailsActive(!contextMenuDetailsActive)),
            details: true
        }];
}