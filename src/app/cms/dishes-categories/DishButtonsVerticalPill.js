import React from "react";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {
    getCategory,
    setActiveRemovalType,
    setCategory,
    setDish,
    setEditDishFormActive,
    setMenuItemForAction
} from "../../../slices/dishesCategoriesSlice";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {useDispatch} from "react-redux";

export const DishButtonsVerticalPill = (props) => {
    const dispatch = useDispatch();

    const getCategoryData = async id => {
        const resultAction = await dispatch(getCategory({id: id}));
        if(getCategory.fulfilled.match(resultAction)) {
            return resultAction.payload.category;
        }
        return null;
    }
    
    const handleEditClick = async () => {
        if(props.category) {
            dispatch(setCategory(props.category))
        } else {
            const categoryData = await getCategoryData(props.menuItem.categoryId);
            dispatch(setCategory(categoryData));
        }
        dispatch(setDish(props.menuItem));
        dispatch(setEditDishFormActive(true));
    }
    
    return (
        <div className={'dish-manage-btns-pill-wrapper'}>
            <div className={'dish-manage-btns-pill-box'}>
                <div className={'hover-scaling'}>
                    {props.menuItem.available ? <AvailableIcon/> : <UnavailableIcon/>}
                </div>
                <div className={'clickable-icon hover-scaling'} onClick={() =>  handleEditClick()}>
                    <EditIcon/>
                </div>
                <div className={'clickable-icon hover-scaling'} onClick={() => {
                    dispatch(setMenuItemForAction(props.menuItem));
                    dispatch(setActiveRemovalType('dish'));
                }}>
                    <DeleteIcon/>
                </div>
            </div>
        </div>
    );
}