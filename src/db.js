export const db = [];

export const add = (item) => db.push(item);
export const deleteAll = () => db.splice(0, db.length);