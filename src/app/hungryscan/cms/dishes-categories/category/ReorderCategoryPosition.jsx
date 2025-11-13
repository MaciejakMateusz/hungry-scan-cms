import {DragAndDropIcon} from "../../../../icons/DragAndDropIcon";
import React from "react";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useSelector} from "react-redux";

export const ReorderCategoryPosition = ({id, category, currentOrder}) => {
    const {restaurant} = useSelector(state => state.dashboard.view);
    const restaurantLanguage = restaurant?.value.settings.language.toLowerCase();
    const {
        attributes,
        listeners,
        setNodeRef, transform,
        transition,
        isDragging
    } = useSortable({id});
    const dndStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : 'auto'
    };

    return (
        <div className={'category-container-header reordering'} ref={setNodeRef} style={dndStyle}>
            <div className={'category-info'}>
                <div className={'drag-and-drop-wrapper'} {...listeners} {...attributes}>
                    <DragAndDropIcon/>
                    <span className={'text-ellipsis'} style={{maxWidth: '250px'}}>{currentOrder}. {category.name[restaurantLanguage]}</span>
                </div>
            </div>
        </div>
    );
}