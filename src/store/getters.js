const getters = {
  user: state => state.user.user,
  mobile: state => state.user.mobile,
  password: state => state.user.password,
  rememberMe: state => state.user.rememberMe,
  token: state => state.user.token,
  isAdmin: state => state.user.isAdmin,
  permissions: state => state.user.permissions,
  content: state => state.pageheader.content

}
export default getters
