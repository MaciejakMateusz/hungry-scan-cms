import React, {useEffect, useState} from "react";
import {AvailableIcon} from "../../icons/AvailableIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import {apiHost, imagesPath} from "../../../apiData";
import {getDecodedJwt} from "../../../utils";
import {UnavailableIcon} from "../../icons/UnavailableIcon";
import {WarningDialogWindow} from "../dialogWindows/WarningDialogWindow";
import {ConfirmationDialogWindow} from "../dialogWindows/ConfirmationDialogWindow";
import {ImgPlaceholderIcon} from "../../icons/ImgPlaceholderIcon";
import {useTranslation} from "react-i18next";
import {getTranslation} from "../../../locales/langUtils";
import {LoadingSpinner} from "../../icons/LoadingSpinner";

export const DishesCategoriesList = ({categoryFormActive, setCategory, setCategoryList}) => {
    const {t} = useTranslation();
    const [categories, setCategories] = useState([]);
    const [categoryForAction, setCategoryForAction] = useState({});
    const [menuItemForAction, setMenuItemForAction] = useState({});
    const [isRemovalActive, setIsRemovalActive] = useState(false);
    const [isRemovalConfirmed, setIsRemovalConfirmed] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [confirmationTimeoutId, setConfirmationTimeoutId] = useState(null);
    const [errorTimeoutId, setErrorTimeoutId] = useState(null);
    const [spinner, setSpinner] = useState(null);

    const fetchCategories = () => {
        setSpinner(<LoadingSpinner/>)
        fetch(`${apiHost}/api/cms/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was an error while communicating with a server.");
            }
        }).then(data => {
            setSpinner(null)
            setCategories(data);
            setCategoryList(data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    const handleRemovalSubmission = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify(categoryForAction.id);

        fetch(`${apiHost}/api/cms/categories/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: requestBody
        }).then(response => {
            if (response.ok) {
                setIsRemovalActive(false);
                setCategoryForAction({});
                setIsRemovalConfirmed(true);

                if (confirmationTimeoutId) {
                    clearTimeout(confirmationTimeoutId);
                }

                const newConfirmationTimeoutId = setTimeout(() => {
                    setIsRemovalConfirmed(false);
                }, 4000);
                setConfirmationTimeoutId(newConfirmationTimeoutId);

                fetchCategories();
                return response.text();
            } else {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
        }).catch(errorData => {
            setIsRemovalActive(false);

            if (errorTimeoutId) {
                clearTimeout(errorTimeoutId);
                setErrorData({})
            }

            setErrorData(errorData);

            const newErrorTimeoutId = setTimeout(() => {
                setErrorData({});
            }, 4000);
            setErrorTimeoutId(newErrorTimeoutId);
        });
    };

    const renderRemovalDialog = () => {
        return (
            <>
                <div className={'overlay'}></div>
                <div className={'removal-dialog'}>
                    {t('confirmCategoryRemoval')} "{getTranslation(categoryForAction.name)}"
                    <form onSubmit={handleRemovalSubmission}>
                        <button type="submit">{t('remove')}</button>
                    </form>
                    <button onClick={discardDeletion}>{t('cancel')}</button>
                </div>
            </>
        );
    };

    const discardDeletion = () => {
        setIsRemovalActive(false);
        setCategoryForAction({});
    };

    const renderList = () => {
        if(spinner) {
            return (<LoadingSpinner/>);
        }
        return categories.map(category => (
            <div key={category.id} className={'dishes-categories-list-grid'}>
                <div className={'category-wrapper'}>
                    <div className={'category-container'}>
                        <div className={'category-display-order'}>{category.displayOrder}</div>
                        <span className={'category-container-text'}>{getTranslation(category.name)}</span>
                    </div>
                    <div className={'category-manage-btns-pill-box'}>
                        <div className={'hover-scaling'}>
                            {category.available ? <AvailableIcon/> : <UnavailableIcon/>}
                        </div>
                        <div>
                            <div className={'clickable-icon hover-scaling'} onClick={() => {
                                setCategory(category);
                                categoryFormActive(true);
                            }}>
                                <EditIcon/>
                            </div>
                        </div>
                        <div className={'clickable-icon hover-scaling'} onClick={() => {
                            setCategoryForAction(category);
                            setIsRemovalActive(true);
                        }}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
                <div className={'dishes-wrapper'}>
                    {category.menuItems.length === 0 && (<span className={'no-items-msg'}>{t('noDishes')}</span>)}
                    {category.menuItems.map(menuItem => (
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
                                                     alt={`Dish - ${menuItem.imageName}`} /> :
                                                <ImgPlaceholderIcon/>
                                            }
                                        </div>
                                        <div className={'dish-text-grid'}>
                                            <span className={'dish-title'}>{getTranslation(menuItem.name)}</span>
                                            <span className={'dish-description'}>{getTranslation(menuItem.description)}</span>
                                            <div className={'dish-price'}>
                                                <span>{menuItem.price} zł</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'dish-manage-btns-pill-wrapper'}>
                                <div className={'dish-manage-btns-pill-box'}>
                                    <div className={'hover-scaling'}>
                                        {menuItem.available ? <AvailableIcon/> : <UnavailableIcon/>}
                                    </div>
                                    <div className={'clickable-icon hover-scaling'}>
                                        <EditIcon/>
                                    </div>
                                    <div className={'clickable-icon hover-scaling'}>
                                        <DeleteIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="dishes-categories-list-container">
            {categories.length === 0 ? (<span className="no-items-msg categories">{t('noCategories')}</span>) : renderList()}
            {isRemovalActive && renderRemovalDialog()}
            {isRemovalConfirmed && (<ConfirmationDialogWindow text={"Kategoria usunięta pomyślnie."}/>)}
            {errorData.exceptionMsg && (<WarningDialogWindow text={errorData.exceptionMsg}/>)}
        </div>
    );
};