import {DragAndDropIcon} from "../../../../icons/DragAndDropIcon";
import {getTranslation} from "../../../../../locales/langUtils";
import React from "react";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export const ReorderCategoryPosition = ({id, category, currentOrder}) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
    const dndStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto'
    };

    return (
        <div className={'category-container-header'} ref={setNodeRef} style={dndStyle}>
            <div className={'category-info'}>
                <div className={'drag-and-drop-wrapper'} {...listeners} {...attributes}>
                    <DragAndDropIcon/>
                    {currentOrder}. {getTranslation(category.name)}
                </div>
            </div>
        </div>
    );
}