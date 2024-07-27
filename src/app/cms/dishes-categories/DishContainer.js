import React from "react";
import {imagesPath} from "../../../apiData";
import {ImgPlaceholderIcon} from "../../icons/ImgPlaceholderIcon";
import {getTranslation} from "../../../locales/langUtils";
import {formatPrice} from "../../../utils";
import {DishButtonsVerticalPill} from "./DishButtonsVerticalPill";

export const DishContainer = ({menuItem, category}) => {
    return (
        <div key={menuItem.id} className={'dish-container'}>
            <div className={'dish-content-wrapper'}>
                <div className={'dish-display-order'}>
                    <span>{menuItem.displayOrder}</span>
                </div>
                <div className={'dish-content-box'}>
                    <div className={'dish-content-grid'}>
                        <div className={'dish-image-container'}>
                            {menuItem.imageName ?
                                <img className={'dish-image'}
                                     src={`${imagesPath}/${menuItem.imageName}`}
                                     alt={`Dish - ${menuItem.imageName}`}/> :
                                <ImgPlaceholderIcon/>
                            }
                        </div>
                        <div className={'dish-text-grid'}>
                            <span className={'dish-title'}>{getTranslation(menuItem.name)}</span>
                            <span
                                className={'dish-description'}>{getTranslation(menuItem.description)}</span>
                            <div className={'dish-price'}>
                                <span>{formatPrice(menuItem.price)} zł</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DishButtonsVerticalPill menuItem={menuItem} category={category}/>
        </div>
    );
}