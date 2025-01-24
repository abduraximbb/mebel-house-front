
export const saveStorage = (key: string, value: any) => {
    if(typeof(value) === "string"){
        localStorage.setItem(key, value)
    }else{
        localStorage.setItem(key, JSON.stringify(value))
    }
}
export const getStorage = (key: string) => {
    let value = localStorage.getItem(key)
    if(value && typeof(value) === "object"){
        return JSON.parse(value)
    }else{
        return value
    }
}
export const clearStorage = (key: string) => {
    localStorage.removeItem(key)
}
