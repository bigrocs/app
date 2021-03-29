<template>
<view>
	<view>
		<view class="content">
			<view class="text-area-branch">
				<text class="title">门店: {{branchName}}</text>
			</view>
		</view>
		<boxing 
			v-if="branch==='boxing'&&(roles.indexOf('root')>-1||roles.indexOf('manager')>-1)"
		/>
		<chunliang 
			v-if="branch==='chunliang'&&(roles.indexOf('root')>-1||roles.indexOf('manager')>-1)"
		/>
		<view v-if="!(roles.indexOf('root')>-1||roles.indexOf('manager')>-1)"  class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">欢迎使用新世纪管理系统</text>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import {  mapGetters } from 'vuex'
	import boxing from '@/components/report/boxing.vue'
	import chunliang from '@/components/report/chunliang.vue'
	export default {
		components: { 
			boxing,
			chunliang,
		},	
		computed: {
		...mapGetters([
			'roles',
			]),
		},
		data() {
			return {
				branch: uni.getStorageSync('branch'),
				branchName:''
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			async init(){
				if (this.branch == '') {
					await this.chackLocation().then(res=>{
						this.latitude= res.latitude
						this.longitude= res.longitude
						if (res.latitude>37.141&&res.latitude<37.143&&res.longitude>118.131&&res.longitude<118.133) {
							this.branch = 'boxing'
							this.branchName = '博兴'
							uni.setStorageSync('branch',this.branch)
						}
						if (res.latitude>37.253&&res.latitude<37.258&&res.longitude>118.210&&res.longitude<118.218) {
							this.branch = 'chunliang'
							this.branchName = '纯梁'
							uni.setStorageSync('branch',this.branch)
						}
					}).catch(err=>{
						this.$refs.uTips.show({
							duration: 5000,
							title: "获取位置失败",
							type: 'error'
						});
						return
					})
				}
				switch (this.branch) {
					case 'boxing':
						this.branch = 'boxing'
						this.branchName = '博兴'
						break;
					case 'chunliang':
						this.branch = 'chunliang'
						this.branchName = '纯梁'
						break;
					default:
						this.branch = 'boxing'
						this.branchName = '博兴'
						break;
				}
			},
			async chackLocation(){
				return new Promise((resolve, reject) => {
					uni.getLocation({
						success(res) {
							resolve(res)
						},
						fail(err){
							reject(err)
						}
					});
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
	
	.text-area-branch {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
