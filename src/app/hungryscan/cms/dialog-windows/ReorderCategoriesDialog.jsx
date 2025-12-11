import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setErrorData,
    setReorderCategoriesDialogActive,
    updateCategoriesOrder
} from "../../../../slices/dishesCategoriesSlice";
import {DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';

import {ReorderCategoryPosition} from "../dishes-categories/category/ReorderCategoryPosition";
import {FormErrorDialog} from "../../../error/FormErrorDialog";
import {BorderedButton} from "../../common/BorderedButton";
import {ActionButton} from "../../common/ActionButton";
import {useCustomSensors} from "../../../../hooks/useCustomSensors";

export const ReorderCategoriesDialog = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.cms.fetchActiveMenu);
    const [categories, setCategories] = useState([]);
    const {errorData} = useSelector(state => state.dishesCategories.updateCategoriesOrder)
    const sensors = useCustomSensors();

    useEffect(() => {
        if (menu?.categories) {
            setCategories(menu.categories);
        }
    }, [menu]);

    const discardDialog = () => {
        dispatch(setReorderCategoriesDialogActive(false));
        dispatch(setErrorData(null));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateCategoriesOrder({categories: categories}));
        if (updateCategoriesOrder.fulfilled.match(resultAction)) {
            dispatch(setReorderCategoriesDialogActive(false));
            dispatch(setErrorData(null));
        } else {
            dispatch(setErrorData(resultAction?.payload));
        }
    }

    const handleDragEnd = async event => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const oldIndex = categories.findIndex(c => c.id.toString() === active.id);
        const newIndex = categories.findIndex(c => c.id.toString() === over.id);

        const categoriesOrdered = arrayMove(categories, oldIndex, newIndex);
        const newCategories = categoriesOrdered.map((c, index) => ({
            ...c,
            displayOrder: index + 1,
        }));

        setCategories(newCategories);
    };

    return (
        <>
            <FormErrorDialog errorData={errorData} setErrorData={setErrorData}/>
            <div className={'overlay'}>
                <div className={'reordering-dialog'}>
                    <div className={'reordering-dialog-header'}>
                        <p>{t('reorderCategories')}</p>
                    </div>
                    <div className={'reordering-dialog-content'}>
                        <DndContext sensors={sensors}
                                    onDragEnd={(e) => handleDragEnd(e)}>
                            <SortableContext items={categories.map(c => c.id.toString())}>
                                {categories.map((category, index) => (
                                    <ReorderCategoryPosition key={`${category.id}-${category.displayOrder}`}
                                                             id={category.id.toString()}
                                                             category={category}
                                                             currentOrder={index + 1}/>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                    <div className={'reordering-dialog-footer'}>
                        <BorderedButton onClick={discardDialog}
                                        text={t('cancel')}
                                        isBordered={true}/>
                        <form onSubmit={handleSubmit} style={{all: 'unset'}}>
                            <ActionButton type="submit" text={t('confirm')}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}