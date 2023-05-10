const dateNowTimeStamp = Date.now();

export const DATE_NOW = new Date(dateNowTimeStamp).toISOString();
export const DATE_NOW_MINUS_1_SEC = new Date(dateNowTimeStamp - 1000).toISOString();
export const DATE_NOW_PLUS_1_SEC = new Date(dateNowTimeStamp + 1000).toISOString();
