import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {setContextMenuDetailsActive, setEditMenuFormActive, setMenuDuplicated} from "../slices/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActiveRemovalType} from "../slices/dishesCategoriesSlice";
import {duplicateMenu, fetchActiveMenu} from "../slices/cmsSlice";
import {useState} from "react";
import {useFetchCurrentRestaurant} from "./useFetchCurrentRestaurant";

export const useMenuContextPositions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {contextMenuDetailsActive} = useSelector(state => state.menu.form);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const getRestaurant = useFetchCurrentRestaurant();

    const handleDuplication = async () => {
        const resultAction = await dispatch(duplicateMenu());
        if(duplicateMenu.fulfilled.match(resultAction)) {
            await getRestaurant();
            await dispatch(fetchActiveMenu());
            await dispatch(setMenuDuplicated(true));

            if (confirmationTimeoutId) {
                clearTimeout(confirmationTimeoutId);
            }

            const newConfirmationTimeoutId = setTimeout(() => {
                dispatch(setMenuDuplicated(false))
            }, 4000);
            setConfirmationTimeoutId(newConfirmationTimeoutId);
        }
    }

    const rawPositions = [
        {
            id: 'rename',
            name: t('rename'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setEditMenuFormActive(true))
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
            handler: () => dispatch(setActiveRemovalType('menu'))
        },
        {
            id: 'details',
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => dispatch(setContextMenuDetailsActive(!contextMenuDetailsActive)),
            details: true
        }];

    const getPreparedPositions = () => {
        if (menu?.standard) {
            return rawPositions.filter(p => p.id !== 'remove');
        }
        return rawPositions;
    }

    return getPreparedPositions();
}