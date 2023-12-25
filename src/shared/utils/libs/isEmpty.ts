export const isEmpty = (el: unknown): boolean => {
    if (!el) {
        return true;
    }

    if (Array.isArray(el) || typeof el === 'string') {
        return el.length === 0;
    }

    if (typeof el === 'object') {
        return Object.keys(el).length === 0;
    }

    return true; // Duplicated first line to ignore TS warning of consistent return
};