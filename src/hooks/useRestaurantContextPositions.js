import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    setContextMenuDetailsActive,
    setEditRestaurantFormActive,
    setRemovalActive,
    setRestaurantContextMenuActive
} from "../slices/restaurantSlice";

export const useRestaurantContextPositions = () => {
    const {t} = useTranslation();
    const {contextMenuDetailsActive} = useSelector(state => state.restaurant.form);
    const {restaurants} = useSelector(state => state.dashboard.getRestaurants);
    const dispatch = useDispatch();
    const rawPositions = [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setEditRestaurantFormActive(true));
                dispatch(setRestaurantContextMenuActive(false));
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setRemovalActive(true));
                dispatch(setRestaurantContextMenuActive(false));
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setContextMenuDetailsActive(!contextMenuDetailsActive)),
            details: true
        }];

    const getPreparedPositions = () => {
        if (restaurants?.length === 1) {
            return rawPositions.filter(p => p.id !== 'remove');
        }
        return rawPositions;
    }

    return getPreparedPositions();
}