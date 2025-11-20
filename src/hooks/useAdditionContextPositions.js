import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch} from "react-redux";
import {setAddition, setAdditionDialogActive, setAdditionToRemove, setIsNewAddition} from "../slices/additionsSlice";
import {setActiveObjDetails} from "../slices/globalParamsSlice";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";

export const useAdditionContextPositions = ({ingredient, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon/>,
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
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setAdditionToRemove(ingredient));
                setContextWindowActive(false)
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(ingredient));
                setContextWindowActive(false);
            },
            details: true
        }];
}