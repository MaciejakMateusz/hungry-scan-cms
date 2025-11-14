import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {useDispatch} from "react-redux";
import {setAddition, setAdditionDialogActive, setAdditionToRemove, setIsNewAddition} from "../slices/additionsSlice";
import {setActiveObjDetails} from "../slices/globalParamsSlice";

export const useAdditionContextPositions = ({ingredient, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setAddition(ingredient));
                dispatch(setIsNewAddition(false));
                dispatch(setAdditionDialogActive(true));
                setContextWindowActive(false)
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setAdditionToRemove(ingredient));
                setContextWindowActive(false)
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setActiveObjDetails(ingredient));
                setContextWindowActive(false);
            },
            details: true
        }];
}