<template>
	<view>
		<view  v-if="PageCur=='home'" class="u-m-t-20">
			<u-cell-group>
				<u-cell-item index="branch" @click="navChange" icon="heart" :iconStyle="{color:'#ff6f00'}" title="选择门店"></u-cell-item>
			</u-cell-group>
		</view>
		<branch v-if="PageCur=='branch'"/>
	</view>
</template>

<script>
import branch from './branch/index.vue'
export default {
	components: { 
		branch,
	},
	data() {
		return {
			PageCur:'home',
		}
	},
	computed: {
	},
	onLoad() {
		
	},
	methods: {
		navChange(PageCur){
			this.PageCur = PageCur
		},
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
