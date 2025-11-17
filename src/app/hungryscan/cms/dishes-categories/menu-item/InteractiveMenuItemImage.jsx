import React, {useState} from "react";
import {Img} from "react-image";
import {PlaceholderImgIcon} from "../../../../icons/PlaceholderImgIcon";
import {LoadingSpinner} from "../../../../icons/LoadingSpinner";

export const InteractiveMenuItemImage = ({src, hasImage}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const commonProps = {
        alt: "MenuPreview item preview",
        src,
        className: "menu-item-position-image",
        loader: <div className="image-loader"><LoadingSpinner buttonMode={true}/></div>,
        unloader: <PlaceholderImgIcon/>
    };

    const handleExpansion = () => {
        if (!hasImage) return;
        setIsExpanded(!isExpanded);
    }

    return (
        <div
            className={'menu-item-position-image-container'}
            onClick={handleExpansion}
            style={hasImage ? {cursor: isExpanded ? 'zoom-out' : 'zoom-in'} : {}}>
            <Img {...commonProps}/>
            {isExpanded && (
                <Img{...commonProps}
                    className={`menu-item-position-image is-expanded`}
                />
            )}
        </div>
    );
};