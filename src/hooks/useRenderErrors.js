import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";

export const useRenderErrors = (errorData) => {
    const {t} = useTranslation();

    return useMemo(() => {
        if (!errorData) return null;

        const status = errorData?.status;

        const is500Error = status >= 500 && status < 600;
        const is400Error = status >= 400 && status < 500;
        const isOtherError = status === undefined;

        if (is500Error) {
            return (
                <div className="login-validation-msg">
                    <span>{t("internalServerError")}</span>
                </div>
            );
        }

        if (is400Error) {
            return (
                <div className="login-validation-msg">
                    <span>{t("clientServerError")}</span>
                </div>
            );
        }

        if (isOtherError) {
            return (
                <div className="login-validation-msg">
                    <span>{t("formHasErrors")}</span>
                </div>
            );
        }

        return null;
    }, [errorData, t]);
};