import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUsersActivity} from "../../../../../../slices/statisticsSlice";
import {
    ActivityTime,
    BottomRow,
    Container,
    Ellipsis,
    InfoWrapper,
    Position,
    PositionSeparator,
    RoleLabel,
    RoleLabelText,
    SignedIndicator,
    TopRow,
    WidgetHeader
} from "./UsersActivity.style";
import {LoadingSpinner} from "../../../../../icons/LoadingSpinner";
import {useGetTranslation} from "../../../../../../hooks/useGetTranslation";

export const UsersActivity = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const getTranslation = useGetTranslation();
    const {isLoading, data} = useSelector(state => state.statistics.usersActivity);
    const isBeta = String(process.env.REACT_APP_IS_BETA).toLowerCase() === 'true';

    useEffect(() => {
        if (!isBeta) dispatch(getUsersActivity());
    }, [dispatch, isBeta]);

    if (isBeta) {
        return (
            <>
                <WidgetHeader style={{paddingTop: '30px'}}>{t("lastActivities")}</WidgetHeader>
                <Container>
                    <p className="text-center" style={{ minHeight: "100px" }}>
                        {t("unavailableInBeta")}
                    </p>
                </Container>
            </>
        );
    }

    if (data?.length === 0) return (
        <>
            <WidgetHeader style={{paddingTop: '30px'}}>{t('lastActivities')}</WidgetHeader>
            <Container>
                <span className={'flex-centered'} style={{fontSize: '13px'}}>{t('noOtherUsersInOrganization')}</span>
            </Container>
        </>
    );

    const getRoleLabelColors = role => {
        switch (role.name) {
            case 'ROLE_ADMIN':
                return {background: '#F5EDFF', color: '#8540DD'};
            case 'ROLE_MANAGER':
                return {background: '#E0F3FF', color: '#016DFF'};
            case 'ROLE_STAFF':
                return {background: '#E8F6EE', color: '#5CA37A'};
            default:
                return {background: '#F5EDFF', color: '#8540DD'};
        }
    }

    const renderRoleLabel = roles => {
        if (!roles || roles.length === 0) return null;

        const roleNames = roles.map(r => r.name);

        let selectedRole = null;
        if (roleNames.includes('ROLE_ADMIN')) {
            selectedRole = roles.find(r => r.name === 'ROLE_ADMIN');
        } else if (roleNames.includes('ROLE_MANAGER')) {
            selectedRole = roles.find(r => r.name === 'ROLE_MANAGER');
        } else if (roleNames.includes('ROLE_STAFF')) {
            selectedRole = roles.find(r => r.name === 'ROLE_STAFF');
        }

        if (!selectedRole) return null;

        const colors = getRoleLabelColors(selectedRole);
        return (
            <RoleLabel key={selectedRole.name} $background={colors.background}>
                <RoleLabelText $color={colors.color}>
                    {getTranslation(selectedRole.displayedName)}
                </RoleLabelText>
            </RoleLabel>
        );
    };

    const formatActivityTime = isoString => {
        if (!isoString) return t('never');
        const date = new Date(isoString);
        const now = new Date();
        const diffHours = (now - date) / (1000 * 60 * 60);

        if (diffHours < 24) {
            return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        } else {
            return date.toLocaleDateString([], {year: 'numeric', month: '2-digit', day: '2-digit'});
        }
    }

    return (
        <>
            <WidgetHeader>{t('lastActivities')}</WidgetHeader>
            <Container>
                {isLoading && <LoadingSpinner/>}
                {data?.slice()
                    .sort((a, b) => new Date(b.lastSeenAt) - new Date(a.lastSeenAt))
                    .map((user, index) => (
                        <React.Fragment key={user.username}>
                            <Position>
                                <InfoWrapper>
                                    <TopRow>
                                        {user.signedIn && <SignedIndicator/>}
                                        <Ellipsis>{user.forename} {user.surname}</Ellipsis>
                                        {renderRoleLabel(user.roles)}
                                    </TopRow>
                                    <BottomRow>
                                        <Ellipsis>{user.username}</Ellipsis>
                                    </BottomRow>
                                </InfoWrapper>
                                <ActivityTime>
                                    {formatActivityTime(user.lastSeenAt)}
                                </ActivityTime>
                            </Position>
                            {index < data.length - 1 && <PositionSeparator/>}
                        </React.Fragment>
                    ))}
            </Container>
        </>
    );
}