const STORAGE_KEY="evalDate";
export const getRestaurants=()=>{
    return JSON.parse(localStorage.getItem(STORAGE_KEY))||[];
};
export const saveRestaurants=(data)=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
};