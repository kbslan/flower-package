module.exports = {
  /**
   * @description 网站标题
   */
  title: 'MaLong',
  /**
   * @description 后端接口成功状态
   */
  successCode: '0000',
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 30,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
   */
  passCookieExpires: 7,
  /**
   * @description token key
   */
  UserIdKey: 'UserId',
  /**
   * @description token key
   */
  UserNameKey: 'UserName',
  /**
   * @description token key
   */
  AdminKey: 'Admin',
  /**
   * @description token key
   */
  TokenKey: 'Authorization',
  /**
   * @description 手机号 cookie key
   */
  MobileKey: 'MaLong-Mobile',
  /**
   * @description 密码 cookie key
   */
  PasswordKey: 'MaLong-Password',
  /**
   * @description 记住我 cookie key
   */
  RememberMeKey: 'MaLong-RememberMe',
  /**
   * @description 记住我 cookie key
   */
  PermissionsKey: 'MaLong-Permissions',
  /**
   * @description 包花人 localStorage key
   */
  PackagesKey: 'packages',
  /**
   * @description 采花人 localStorage key
   */
  PickersKey: 'pickers',
  /**
   * @description 品种 localStorage key
   */
  CategorysKey: 'categorys',
  /**
   * @description 规格 localStorage key
   */
  SpecificationsKey: 'specifications',
  /**
   * @description 报损原因 localStorage key
   */
  DamageReasonsKey: 'damageReasons',
  /**
   * @description 包花记录 localStorage key
   */
  FlowRecordKey: 'flowerRecord-',
  /**
   * @description 本地序列号 localStorage key
   */
  NextSeqKey: 'nextSeq-',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000

}
