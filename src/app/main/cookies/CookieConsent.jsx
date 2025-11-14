import React, { useState } from "react";
import { Container, Footer, Header, Text } from "./CookieConsent.style";
import { useTranslation } from "react-i18next";
import { getCookie, setCookie } from "../../../utils/utils";

const COOKIE_NAME = "cookie-consent";

export const CookieConsent = () => {
    const { t } = useTranslation();

    const [isConsent, setIsConsent] = useState(() => {
        if (typeof document === "undefined") return false;
        return getCookie(COOKIE_NAME) === "yes";
    });

    const setConsentCookie = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        const expiryDate = currentDate.toUTCString();
        setCookie(COOKIE_NAME, "yes", expiryDate);
        setIsConsent(true);
    };

    if (isConsent) return null;

    return (
        <Container>
            <Header>{t('weValuePrivacy')}</Header>
            <Text>
                {t("cookieConsentInfo")}
                <a href="/cookies">{t("cookiePolicy")}</a>
            </Text>
            <Footer>
                <div className="general-button" onClick={setConsentCookie}>
                    {t("understand")}
                </div>
            </Footer>
        </Container>
    );
};
