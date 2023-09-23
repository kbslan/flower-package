import Cookies from 'js-cookie'
import Config from '@/settings'

const UserIdKey = Config.UserIdKey
const UserNameKey = Config.UserNameKey
const AdminKey = Config.AdminKey
const TokenKey = Config.TokenKey
const MobileKey = Config.MobileKey
const PasswordKey = Config.PasswordKey
const RememberMeKey = Config.RememberMeKey
const PermissionsKey = Config.PermissionsKey

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(id, rememberMe) {
  if (rememberMe) {
    return Cookies.set(UserIdKey, id, { expires: Config.tokenCookieExpires }) // 设置失效时间
  } else return Cookies.set(UserIdKey, id) // 默认情况下，Cookie 将成为会话 Cookie，即在关闭浏览器后会自动删除
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function setUserName(name, rememberMe) {
  if (rememberMe) {
    return Cookies.set(UserNameKey, name, { expires: Config.tokenCookieExpires }) // 设置失效时间
  } else return Cookies.set(UserNameKey, name) // 默认情况下，Cookie 将成为会话 Cookie，即在关闭浏览器后会自动删除
}

export function removeUserName() {
  return Cookies.remove(UserNameKey)
}

export function isAdmin() {
  return Cookies.get(AdminKey)
}

export function setAdmin(admin, rememberMe) {
  if (rememberMe) {
    return Cookies.set(AdminKey, admin, { expires: Config.tokenCookieExpires }) // 设置失效时间
  } else return Cookies.set(AdminKey, admin) // 默认情况下，Cookie 将成为会话 Cookie，即在关闭浏览器后会自动删除
}

export function removeAdmin() {
  return Cookies.remove(AdminKey)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires }) // 设置失效时间
  } else return Cookies.set(TokenKey, token) // 默认情况下，Cookie 将成为会话 Cookie，即在关闭浏览器后会自动删除
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMobile() {
  return Cookies.get(MobileKey)
}

export function setMobile(mobile, rememberMe) {
  if (rememberMe) {
    return Cookies.set(MobileKey, mobile, { expires: Config.passCookieExpires })
  } else return Cookies.set(MobileKey, mobile)
}

export function removeMobile() {
  return Cookies.remove(MobileKey)
}

export function getPassword() {
  return Cookies.get(PasswordKey)
}

export function setPassword(password, rememberMe) {
  if (rememberMe) {
    return Cookies.set(PasswordKey, password, { expires: Config.passCookieExpires })
  } else return Cookies.set(PasswordKey, password)
}

export function removePassword() {
  return Cookies.remove(PasswordKey)
}

export function getRememberMe() {
  return Cookies.get(RememberMeKey)
}

export function setRememberMe(rememberMe) {
  if (rememberMe) {
    return Cookies.set(RememberMeKey, rememberMe, { expires: Config.passCookieExpires })
  } else return Cookies.set(RememberMeKey, rememberMe)
}

export function removeRememberMe() {
  return Cookies.remove(RememberMeKey)
}

export function getPermissions() {
  return Cookies.get(PermissionsKey)
}

export function setPermissions(permissions, rememberMe) {
  if (rememberMe) {
    return Cookies.set(PermissionsKey, permissions, { expires: Config.passCookieExpires })
  } else return Cookies.set(PermissionsKey, permissions)
}

export function removePermissions() {
  return Cookies.remove(PermissionsKey)
}
