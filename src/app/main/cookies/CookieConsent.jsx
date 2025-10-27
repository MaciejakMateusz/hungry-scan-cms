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
        setCookie(COOKIE_NAME, "yes", { days: 180 });
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
