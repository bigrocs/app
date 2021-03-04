/**
 * login.js 登录类
 */
import store from '@/store'
const login = {
    api : store.state.$u.api,
    MpWechat() {
        // 微信小程序登录
        return new Promise((resolve, reject) => {
            this.uniLogin('weixin').then(res=>{
                if (res.errMsg === "login:ok") {
                    this.socialitesAuth( res.code,'miniprogram_wechat').then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 社会登录授权
    socialitesAuth(code, driver) {
        return new Promise((resolve, reject) => {
            this.api.SocialitesAuth({ code, driver }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    socialitesRegister(driver, mobile, captcha){
        return new Promise(async(resolve, reject) => {
            let request = {
                socialite: {
                    driver: driver,
                    code: '',
                },
                socialiteUser: {
                    users: [
                        {
                            name: '',
                            avatar: '',
                            mobile: mobile,
                        }
                    ]
                },
                verify: captcha
            }
            let provider = ''
            switch (driver) {
                case 'miniprogram_wechat':
                    provider = 'weixin'
                    break;
                default:
                    console.error('不支持此注册方式:', driver);
                    break;
            }

            await this.uniLogin(provider).then(res => {
                request.socialite.code = res.code
            }).catch(err => {
                reject(err)
            })
            await this.uniGetUserInfo(provider).then(res => {
                request.socialiteUser.users[0].name = res.userInfo.nickName
                request.socialiteUser.users[0].avatar = res.userInfo.avatarUrl
            }).catch(err => {
                reject(err)
            })
            console.log(123456, request, provider);
            this.api.SocialitesRegister(request).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    uniGetUserInfo(driver) {
        return new Promise((resolve, reject) => {
            uni.authorize({
                scope: 'scope.userInfo',
                success() {
                    uni.getUserInfo({
                        provider: driver,
                        success: res => {
                            resolve(res)
                        },
                        fail: err => {
                            reject(err)
                        }
                    });
                },
                fail(err){
                    reject(err)
                }
            })
        })
    },
    // uni登录
    uniLogin(driver) {
        return new Promise((resolve, reject) => {
            uni.login({
                provider: driver,
                success: res => {
                    resolve(res)
                },
                fail: err => {
                    reject(err)
                }
            });
        })
    },
}
export default login
