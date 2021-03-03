<template>
<view>
	<home v-if="PageCur=='home'"/>
	<my v-if="PageCur=='my'"/>
	<goods 
		v-if="PageCur=='scan'"
		:barCode="barCode"
	/>
	<tabbar
		@NavChange="navChange"
		@NavScanCodeChange="navScanCodeChange"
	/>
</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue'
	import home from '@/pages/home/index.vue'
	import my from '@/pages/my/index.vue'
	import goods from '@/pages/goods/item.vue'
	export default {
		components: { 
			tabbar,
			home,
			my,
			goods,
		},
		data() {
			return {
				PageCur:'home',
				barCode:'',
			}
		},
		onLoad() {
		},
		methods: {
			navChange(PageCur){
				this.PageCur = PageCur
			},
			navScanCodeChange(code){
				this.barCode= code
			}
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
