import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {
    setContextMenuActive,
    setContextMenuDetailsActive,
    setEditMenuFormActive,
    setMenuDuplicated, setStandardSwitched,
    switchStandard
} from "../slices/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActiveRemovalType} from "../slices/dishesCategoriesSlice";
import {duplicateMenu, fetchActiveMenu} from "../slices/cmsSlice";
import {useFetchCurrentRestaurant} from "./useFetchCurrentRestaurant";
import {useConfirmationMessage} from "./useConfirmationMessage";

export const useMenuContextPositions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {contextMenuDetailsActive} = useSelector(state => state.menu.form);
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
        }
    };

    const handleDuplication = async () => {
        dispatch(setContextMenuActive(false));
        const resultAction = await dispatch(duplicateMenu());
        if (duplicateMenu.fulfilled.match(resultAction)) {
            await getRestaurant();
            await dispatch(fetchActiveMenu());
            confirmDuplication();
        }
    };

    const rawPositions = [
        {
            id: 'rename',
            name: t('rename'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setEditMenuFormActive(true));
                dispatch(setContextMenuActive(false))
            }
        },
        {
            id: 'switchStandard',
            name: t('switchStandard'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => handleSwitchStandard()
        },
        {
            id: 'duplicate',
            name: t('duplicate'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => handleDuplication()
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setActiveRemovalType('menu'));
                dispatch(setContextMenuActive(false));
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setContextMenuDetailsActive(!contextMenuDetailsActive)),
            details: true
        }];

    const getFilteredPositions = () => {
        if (menu?.standard) {
            return rawPositions.filter(p => p.id !== 'remove' && p.id !== 'switchStandard');
        }
        return rawPositions;
    };

    return getFilteredPositions();
}