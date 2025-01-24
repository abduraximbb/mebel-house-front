
export const saveStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
export const getStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null; // Agar qiymat mavjud bo'lmasa, null qaytaring
  }
  try {
    return JSON.parse(value); // JSON formatda bo'lsa parse qiling
  } catch (error) {
    console.error("JSON parse error:", error);
    return null; // Xatolik yuz bersa, null qaytaring
  }
}
export const clearStorage = (key: string) => {
    localStorage.removeItem(key)
}
