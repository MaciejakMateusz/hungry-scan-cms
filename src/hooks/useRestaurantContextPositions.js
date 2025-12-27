import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch, useSelector} from "react-redux";
import {setEditRestaurantFormActive, setRemovalActive, setRestaurantContextMenuActive} from "../slices/restaurantSlice";
import {setActiveObjDetails} from "../slices/globalParamsSlice";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";

export const useRestaurantContextPositions = () => {
    const {t} = useTranslation();
    const {restaurants} = useSelector(state => state.dashboard.getRestaurants);
    const {restaurant} = useSelector(state => state.dashboard.view);
    const dispatch = useDispatch();
    const rawPositions = [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon/>,
            handler: () => {
                dispatch(setEditRestaurantFormActive(true));
                dispatch(setRestaurantContextMenuActive(false));
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setRemovalActive(true));
                dispatch(setRestaurantContextMenuActive(false));
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(restaurant?.value));
                dispatch(setRestaurantContextMenuActive(false));
            },
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