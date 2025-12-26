import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch} from "react-redux";
import {
    setActiveRemovalType,
    setCategory,
    setDish,
    setEditDishFormActive,
    setMenuItemForAction,
    setSwitchCategoryDialogActive
} from "../slices/dishesCategoriesSlice";
import {setCategoryId} from "../slices/dishFormSlice";
import {setActiveObjDetails} from "../slices/globalParamsSlice";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";
import {MoveIcon} from "../app/icons/MoveIcon";

export const useMenuItemContextPositions = ({
                                                category,
                                                menuItem,
                                                setContextWindowActive
                                            }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleEditClick = async () => {
        dispatch(setCategory(category));
        dispatch(setCategoryId(category.id));
        dispatch(setDish(menuItem));
        dispatch(setEditDishFormActive(true));
        setContextWindowActive(false);
    };

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon/>,
            handler: () => handleEditClick()
        },
        {
            id: 'switchCategory',
            name: t('switchCategory'),
            icon: <MoveIcon/>,
            handler: async () => {
                await dispatch(setMenuItemForAction(menuItem))
                dispatch(setCategory(category));
                dispatch(setCategoryId(category.id));
                dispatch(setSwitchCategoryDialogActive(true));
                setContextWindowActive(false);
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setMenuItemForAction(menuItem));
                dispatch(setActiveRemovalType('dish'));
                setContextWindowActive(false);
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(menuItem));
                setContextWindowActive(false);
            },
            details: true
        }];
}