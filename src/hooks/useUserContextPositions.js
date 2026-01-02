import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch} from "react-redux";
import {setActiveObjDetails, setDashboardInEditMode} from "../slices/globalParamsSlice";
import {TrashIcon} from "../app/icons/TrashIcon";
import {InfoIcon} from "../app/icons/InfoIcon";
import {setEditUserFormActive, setUserToRemove, setUserToUpdate} from "../slices/usersSlice";

export const useUserContextPositions = ({user, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleEditClick = async () => {
        dispatch(setUserToUpdate(user));
        dispatch(setEditUserFormActive(true));
        dispatch(setDashboardInEditMode(true));
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
            id: 'remove',
            name: t('remove'),
            icon: <TrashIcon/>,
            handler: () => {
                dispatch(setUserToRemove(user));
                setContextWindowActive(false);
            }
        },
        {
            id: 'details',
            name: t('details'),
            icon: <InfoIcon/>,
            handler: () => {
                dispatch(setActiveObjDetails(user));
                setContextWindowActive(false);
            },
            details: true
        }];
}