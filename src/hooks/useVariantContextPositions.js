import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {DeleteIcon} from "../app/icons/DeleteIcon";
import {useDispatch} from "react-redux";
import {setIsNewVariant, setVariant, setVariantDialogActive, setVariantToRemove} from "../slices/variantsSlice";

export const useVariantContextPositions = ({variant, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setVariant(variant));
                dispatch(setIsNewVariant(false));
                dispatch(setVariantDialogActive(true));
                setContextWindowActive(false)
            }
        },
        {
            id: 'remove',
            name: t('remove'),
            icon: <DeleteIcon width={'25'} height={'25'}/>,
            handler: () => {
                dispatch(setVariantToRemove(variant));
                setContextWindowActive(false)
            }
        }];
}