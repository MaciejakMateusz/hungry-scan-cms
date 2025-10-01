import {createTranslatable, updateTranslatable} from "../locales/langUtils";

export const useTranslatableTransformer = ({obj, key}) => {
    return value => {
        if (!obj?.[key]) {
            return createTranslatable(value);
        }
        return updateTranslatable(obj[key], value)
    }
}