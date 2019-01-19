class LocalStorage {
  static saveItemInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getItemFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}

export default LocalStorage;
