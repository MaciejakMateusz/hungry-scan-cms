import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {useDispatch} from "react-redux";
import {
    getCategory,
    setActiveRemovalType,
    setCategory,
    setDish,
    setEditDishFormActive,
    setMenuItemForAction, setSwitchCategoryDialogActive
} from "../slices/dishesCategoriesSlice";
import {setCategoryId} from "../slices/dishFormSlice";

export const useMenuItemContextPositions = ({category, menuItem, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const getCategoryData = async id => {
        const resultAction = await dispatch(getCategory({id}));
        if (getCategory.fulfilled.match(resultAction)) {
            return resultAction.payload.categoryFormDTO;
        }
        return null;
    };

    const prepareCategoryData = async () => {
        if (category) {
            dispatch(setCategory(category));
            dispatch(setCategoryId(category.id));
        } else {
            const categoryData = await getCategoryData(menuItem.category.id);
            dispatch(setCategory(categoryData));
            dispatch(setCategoryId(categoryData.id));
        }
    }

    const handleEditClick = async () => {
        await prepareCategoryData();
        dispatch(setDish(menuItem));
        dispatch(setEditDishFormActive(true));
        setContextWindowActive(false);
    };

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => handleEditClick()
        },
        {
            id: 'switchCategory',
            name: t('switchCategory'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: async () => {
                await dispatch(setMenuItemForAction(menuItem))
                await prepareCategoryData()
                dispatch(setSwitchCategoryDialogActive(true));
                setContextWindowActive(false);
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setMenuItemForAction(menuItem));
                dispatch(setActiveRemovalType('dish'));
                setContextWindowActive(false);
            }
        }];
}