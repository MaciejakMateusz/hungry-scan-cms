import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {setContextMenuDetailsActive, setMenuDuplicated} from "../slices/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import {setActiveRemovalType} from "../slices/dishesCategoriesSlice";
import {duplicateMenu, fetchActiveMenu} from "../slices/cmsSlice";
import {useCallback, useState} from "react";
import {getCurrentRestaurant, setRestaurant} from "../slices/dashboardSlice";

export const useMenuContextPositions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {contextMenuDetailsActive} = useSelector(state => state.menu.form);
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);

    const getRestaurant = useCallback(
        async () => {
            const resultAction = await dispatch(getCurrentRestaurant());
            if (getCurrentRestaurant.fulfilled.match(resultAction)) {
                dispatch(setRestaurant({
                    value: resultAction.payload,
                    label: resultAction.payload?.name
                }))
            }
        }, [dispatch]
    );

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
            handler: () => console.log("rename")
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