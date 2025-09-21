import React from "react";
import {ReactSVG} from "react-svg";
import {formatPrice} from "../../../../../../utils/utils";
import {getTranslation} from "../../../../../../locales/langUtils";

export const MenuItemContent = ({menuItem, hasImage}) => {
    const hasPromotion = menuItem.banners?.map(b => b.id).includes('promo');

    const renderPrice = () => {
        if (!hasPromotion) {
            return (
                <div className={'menu-preview-menu-item-price'}>{formatPrice(menuItem.price)} zł</div>
            );
        }
        return (
            <div className={'menu-preview-menu-item-price promo'}>
                <s className={'menu-preview-old-price'}>{formatPrice(menuItem.price)} zł</s>
                {formatPrice(menuItem.promoPrice)} zł
                <ReactSVG src={'/theme/icons/promo-small.svg'} className={'menu-preview-promo-icon'}/>
            </div>
        );
    }

    return (
        <div className={`menu-preview-menu-item-text-data-grid ${!hasImage ? 'no-photo' : ''}`}>
            <div className={'menu-preview-menu-item-name'}>{getTranslation(menuItem.name)}</div>
            <div className={'menu-preview-menu-item-description'}>{getTranslation(menuItem.description)}</div>
            {renderPrice()}
        </div>
    );
}