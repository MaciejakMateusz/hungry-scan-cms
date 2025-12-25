import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {
    setContextMenuActive,
    setEditMenuFormActive,
    setErrorData,
    setMenuDuplicated,
    setStandardSwitched,
    switchStandard
} from "../slices/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActiveRemovalType} from "../slices/dishesCategoriesSlice";
import {duplicateMenu, fetchActiveMenu} from "../slices/cmsSlice";
import {useFetchCurrentRestaurant} from "./useFetchCurrentRestaurant";
import {useConfirmationMessage} from "./useConfirmationMessage";
import {setActiveObjDetails} from "../slices/globalParamsSlice";
import {StarIcon} from "../app/icons/StarIcon";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";
import {DuplicateIcon} from "../app/icons/DuplicateIcon";

export const useMenuContextPositions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.dashboard.view);
    const menus = restaurant?.value.menus;
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const getRestaurant = useFetchCurrentRestaurant();
    const confirmDuplication = useConfirmationMessage(setMenuDuplicated);
    const confirmStandardSwitched = useConfirmationMessage(setStandardSwitched);

    const handleSwitchStandard = async () => {
        dispatch(setContextMenuActive(false));
        const resultAction = await dispatch(switchStandard());
        if (switchStandard.fulfilled.match(resultAction)) {
            await dispatch(switchStandard());
            await getRestaurant();
            await dispatch(fetchActiveMenu());
            confirmStandardSwitched();
            dispatch(setErrorData(null));
        } else {
            dispatch(setErrorData(resultAction?.payload))
        }
    };

    const handleDuplication = async () => {
        dispatch(setContextMenuActive(false));
        const resultAction = await dispatch(duplicateMenu());
        if (duplicateMenu.fulfilled.match(resultAction)) {
            await getRestaurant();
            await dispatch(fetchActiveMenu());
            confirmDuplication();
            dispatch(setErrorData(null));
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    };

    let rawPositions = [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon/>,
            handler: () => {
                dispatch(setEditMenuFormActive(true));
                dispatch(setContextMenuActive(false));
            }
        },
        {
            id: 'switchStandard',
            name: t('switchStandard'),
            icon: <StarIcon/>,
            handler: () => handleSwitchStandard()
        },
        {
            id: 'duplicate',
            name: t('duplicate'),
            icon: <DuplicateIcon/>,
            handler: () => handleDuplication()
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setActiveRemovalType('menu'));
                dispatch(setContextMenuActive(false));
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(menu));
                dispatch(setContextMenuActive(false));
            },
            details: true
        }];

    const getFilteredPositions = () => {
        if (menu?.standard) {
            rawPositions = rawPositions.filter(p => p.id !== 'remove' && p.id !== 'switchStandard');
        }
        const menusLimit = Number(process.env.REACT_APP_MENUS_LIMIT);
        if (menus?.length >= menusLimit) {
            rawPositions = rawPositions.filter(p => p.id !== 'duplicate');
        }
        return rawPositions;
    };

    return getFilteredPositions();
}