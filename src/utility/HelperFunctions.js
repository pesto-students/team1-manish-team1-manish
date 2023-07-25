export const hasEmptyValues = (obj, exceptionKey) => {
    for (const key in obj) {
        if (key !== exceptionKey) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value === undefined || value === null || value === '') {
                    return true;
                }
            }
        }
    }
    return false;
}