
const getItem = (key) => {
  localStorage.getItem(key)
}

const saveItem = (key, value) => {
  localStorage.setItem(key, value)
}

const removeItem = (key) => {
  localStorage.removeItem(key)
}

const webStorage = {
  getItem,
  saveItem,
  removeItem
}

export default webStorage
