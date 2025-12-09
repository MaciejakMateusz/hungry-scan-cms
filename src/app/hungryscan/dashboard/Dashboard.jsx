import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCmsActive, setCurrentView, setIsInEditMode, setNextViewName} from "../../../slices/globalParamsSlice";
import {CODE_QR, DISHES_CATEGORIES, STATS, USER_PROFILE, USERS} from "../../../utils/viewsConstants";
import {Statistics} from "./stats/Statistics";
import {DashboardTopper} from "./DashboardTopper";
import {NewRestaurantForm} from "./restaurant/NewRestaurantForm";
import {EditRestaurantForm} from "./restaurant/EditRestaurantForm";
import {NavPanel} from "../NavPanel";
import {QrCode} from "./qr/QrCode";
import {useTranslation} from "react-i18next";
import {UserProfile} from "./user/UserProfile";
import {Users} from "./users/Users";
import {useClearDashboardState} from "../../../hooks/useClearDashboardState";
import {DecisionDialog} from "../cms/dialog-windows/DecisionDialog";
import {setSchedulerActive} from "../../../slices/cmsSlice";
import {setScheduleChanged} from "../../../slices/restaurantSlice";
import {useDashboardNavElements} from "../../../hooks/useDashboardNavElements";

export const Dashboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {currentView, nextViewName} = useSelector(state => state.globalParams.globalParams);
    const {
        newRestaurantFormActive,
        editRestaurantFormActive,
        scheduleChanged
    } = useSelector(state => state.restaurant.form);
    const clearDashboardState = useClearDashboardState();
    const expandedDashboardNavElements = useDashboardNavElements({type: 'expanded'});
    const collapsedDashboardNavElements = useDashboardNavElements({type: 'collapsed'});


    const renderMainView = () => {
        if (newRestaurantFormActive) {
            return (<NewRestaurantForm/>);
        } else if (editRestaurantFormActive) {
            return (<EditRestaurantForm/>);
        }

        switch (currentView) {
            case USER_PROFILE:
                return (<UserProfile/>)
            case STATS:
                return (<Statistics/>);
            case CODE_QR:
                return (<QrCode/>);
            case USERS:
                return (<Users/>);
            default:
                return (<Statistics/>);
        }
    };

    return (
        <>
            {nextViewName &&
                <DecisionDialog
                    msg={t('confirmViewSwitch')}
                    onCancel={() => dispatch(setNextViewName(null))}
                    onSubmit={() => {
                        clearDashboardState();
                        dispatch(setSchedulerActive(false));
                        dispatch(setCurrentView(nextViewName));
                        dispatch(setIsInEditMode(false));
                        dispatch(setNextViewName(null));
                    }}
                />
            }
            {scheduleChanged &&
                <DecisionDialog msg={t('scheduleUpdatedInfo')}
                                onCancel={() => dispatch(setScheduleChanged(false))}
                                customCancelMsg={t('understood')}
                                onCustomAction={() => {
                                    dispatch(setCmsActive(true));
                                    dispatch(setCurrentView(DISHES_CATEGORIES));
                                    dispatch(setSchedulerActive(true));
                                    dispatch(setScheduleChanged(false));
                                }}
                                customActionMsg={t('menuSchedules')}
                />
            }
            <NavPanel children={expandedDashboardNavElements}
                      childrenCollapsed={collapsedDashboardNavElements}
                      clearStateHandler={clearDashboardState}/>
            <div className={'cms-main'}>
                <DashboardTopper children={expandedDashboardNavElements}
                                 clearStateHandler={clearDashboardState}/>
                {renderMainView()}
            </div>
        </>
    );
}