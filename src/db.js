export const db = [];

export const add = (item) => db.push(item);
export const contains = (item) => db.includes(item);
export const popLastItem = db.pop();