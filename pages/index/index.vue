<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello1'
			}
		},
		onLoad() {
			this.init()
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

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
