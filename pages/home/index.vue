<template>
<view>
	<view>
		<department 
			v-if="roles.indexOf('root')>-1||roles.indexOf('manager')>-1||roles.indexOf('finance')>-1"
		/>
		<view v-else  class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">欢迎使用新世纪管理系统</text>
			</view>
		</view>
		{{data.latitude}}
		{{data.longitude}}
	</view>
</view>
</template>

<script>
	import {  mapGetters } from 'vuex'
	import department from '@/components/report/department.vue'
	export default {
		components: { 
			department,
		},	
		computed: {
		...mapGetters([
			'roles',
			]),
		},
		data() {
			return {
				data:{},
			}
		},
		mounted() {
			uni.getLocation({
				success:(res)=> {
					this.data = res
				},
			});
		},
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
