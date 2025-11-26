import {useTranslation} from "react-i18next";
import {EditIcon} from "../app/icons/EditIcon";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewVariant, setVariant, setVariantDialogActive, setVariantToRemove} from "../slices/variantsSlice";
import {setVariants} from "../slices/dishFormSlice";
import {TrashIcon} from "../app/icons/TrashIcon";

export const useVariantContextPositions = ({variant, setContextWindowActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {variants} = useSelector(state => state.dishForm.form);

    const handleVariantRemoval = e => {
        e.preventDefault();
        const updatedVariants = variants.filter(v => v.id !== variant.id);
        dispatch(setVariants(updatedVariants));
        dispatch(setVariantToRemove(null));
    };

    return [
        {
            id: 'edit',
            name: t('edit'),
            icon: <EditIcon/>,
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
            icon: <TrashIcon/>,
            handler: (e) => handleVariantRemoval(e)
        }];
}