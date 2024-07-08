
export const saveToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string ) : [] | null  => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
