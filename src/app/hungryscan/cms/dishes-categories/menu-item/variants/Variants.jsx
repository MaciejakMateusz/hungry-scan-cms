import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {DndContext} from "@dnd-kit/core";
import {setVariants} from "../../../../../../slices/dishFormSlice";
import {VariantPosition} from "./VariantPosition";
import {setIsNewVariant, setVariantDialogActive} from "../../../../../../slices/variantsSlice";
import {useTranslation} from "react-i18next";
import {VariantFormDialog} from "./VariantFormDialog";
import {useCustomSensors} from "../../../../../../hooks/useCustomSensors";

export const Variants = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {variants} = useSelector(state => state.dishForm.form);
    const {variantDialogActive} = useSelector(state => state.variants.view);
    const variantIds = variants?.map(variant => variant.id.toString());
    const sensors = useCustomSensors();

    if (!variants) {
        return null;
    }

    const handleDragEnd = async event => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const oldIndex = variants.findIndex(c => c.id.toString() === active.id);
        const newIndex = variants.findIndex(c => c.id.toString() === over.id);

        const variantsOrdered = arrayMove(variants, oldIndex, newIndex);
        const newVariants = variantsOrdered.map((c, index) => ({
            ...c,
            displayOrder: index + 1,
        }));

        dispatch(setVariants(newVariants));
    };

    return (
        <>
            {variantDialogActive && <VariantFormDialog variants={variants}/>}
            <div className={'menu-item-form-variants-container'}>
                <div className={'flex-end-container'}>
                    <div className={'new-position-button'} onClick={() => {
                        dispatch(setIsNewVariant(true));
                        dispatch(setVariantDialogActive(true))
                    }}>
                        + {t('newVariant')}
                    </div>
                </div>
                {variants?.length === 0 && <p className={'flex-centered'}>{t('noVariantsInDish')}</p>}
                <DndContext sensors={sensors}
                            onDragEnd={(event) => handleDragEnd(event)}>
                    <SortableContext items={variantIds}>
                        {variants.map(variant => (
                            <VariantPosition key={`${variant.id}-${variant.displayOrder}`}
                                             id={variant.id.toString()}
                                             variant={variant}/>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </>
    );

}