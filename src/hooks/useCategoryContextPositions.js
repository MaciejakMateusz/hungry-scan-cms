import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch} from "react-redux";
import {
    setActiveRemovalType,
    setCategory, setCategoryForAction,
    setEditCategoryFormActive,
    setReorderCategoriesDialogActive
} from "../slices/dishesCategoriesSlice";
import {setActiveObjDetails} from "../slices/globalParamsSlice";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";
import {ReorderIcon} from "../app/icons/ReorderIcon";

export const useCategoryContextPositions = ({category, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleEditClick = async () => {
        dispatch(setCategory(category));
        dispatch(setEditCategoryFormActive(true));
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
            id: 'reorderCategories',
            name: t('reorderCategories'),
            icon: <ReorderIcon/>,
            handler: () => {
                dispatch(setReorderCategoriesDialogActive(true));
                setContextWindowActive(false);
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setCategoryForAction(category));
                dispatch(setActiveRemovalType('category'));
                setContextWindowActive(false);
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(category));
                setContextWindowActive(false);
            },
            details: true
        }];
}