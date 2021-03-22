<template>
	<view>
		<view class="u-m-t-20">
			<button @tap="handlerBranch('boxing')">博兴店</button>
            <button @tap="handlerBranch('chunliang')">纯梁店</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	computed: {
	},
	onLoad() {
		
	},
	methods: {
        handlerBranch(branch){
            uni.setStorageSync('branch',branch)
            this.$u.route({
				type:'redirectTo',
				url: 'pages/index/index'
			})
        }
	}
}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
