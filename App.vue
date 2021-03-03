<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				if (!uni.getStorageSync('token')) {
					this.$store.dispatch('user/login').then(res=>{
						if(res.socialiteUser.users.length===1){
							uni.setStorageSync('token', res.socialiteUser.users[0].token)
							this.userInfo()
						}else{
							// 活用户是进入选择登陆页面
							console.log(123,res)
						}
					})
				}else{
					this.userInfo()
				}
			},
			userInfo(){
				this.$store.dispatch('user/getInfo').catch(err => {
					uni.removeStorageSync('token'); // 删除token 重新获取
					this.init()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
