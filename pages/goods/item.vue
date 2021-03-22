<template>
	<view  class="content">
		<view v-if="Object.keys(goods).length > 0" class="jingdong">
			<view class="left">
				<view class="sum">
					￥
					<text class="num">{{goods.price}}</text>
				</view>
				<view class="type" v-if="(this.roles.indexOf('root')>-1||this.roles.indexOf('manager')>-1||this.roles.indexOf('finance')>-1||this.roles.indexOf('store_keeper')>-1||this.roles.indexOf('group')>-1)&&goods.buyPrice">进价: ￥ {{goods.buyPrice}}</view>
				<view class="type">部门: {{goods.deptCode}}</view>
				<view class="type">PLU: {{goods.pluCode}}</view>
			</view>
			<view class="right">
				<view class="top">
					<view class="title">
						<text class="tag">{{goods.spec}}</text>
						<text>{{goods.name}}</text>
					</view>
					<view class="bottom">
						<view class="date u-line-1">条码: {{goods.barCode}}</view>
						<!-- <view class="immediate-use">立即使用</view> -->
					</view>
				</view>
				<view v-for="(item, index) in goods.bars" :key="index"  class="top">
					<view class="bottom">
						<view class="date u-line-1">条码: {{item.barCode}}</view>
					</view>
				</view>	
				<view class="tips">
					<view class="explain">
						<view>更新: {{ goods.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}:{s} 星期{a}') }}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="(this.roles.indexOf('root')>-1||this.roles.indexOf('manager')>-1||this.roles.indexOf('finance')>-1||this.roles.indexOf('store_keeper')>-1)&&goods.hasOwnProperty('stock')" class="supplier">
			<view>供应商库存: </view>
			<view v-for="(item, index) in goods.stock.supplier" :key="index"  class="item">
				<view class="bottom">
					<span class="left">[{{item.code}}] {{item.name}}</span>
					<span class="right">数量: {{item.number}}</span>
				</view>
			</view>	
		</view>
		<view class="bot">
			<view>门店: {{branchName}}</view>
			<view>位置: 纬度[{{latitude}}] 经度[{{longitude}}]</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
import {  mapGetters } from 'vuex'
export default {
	data() {
		return {
			goods:{
			},
			branch:uni.getStorageSync('branch'),
			branchName:'',
			latitude:'',
			longitude:'',
		}
	},
	computed: {
		...mapGetters([
			'roles',
		]),
	},
	methods: {
		async GetGoods(barCode){
			if (this.branch == ''|| !(this.roles.indexOf('root')>-1||this.roles.indexOf('manager')>-1||this.roles.indexOf('finance')>-1||this.roles.indexOf('store_keeper')>-1||this.roles.indexOf('group')>-1)) {
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
				if (this.branch == ''){
					this.$refs.uTips.show({
						duration: 5000,
						title: "未在门店内无法使用",
						type: 'error'
					});
					return 
				}
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
			await this.$u.api.GetGoods({
				item:{
					bar_code:barCode
				},
				database: this.branch
			}).then(res=>{
				if (res.valid) {
					this.goods = res.item
				}else{
					this.$refs.uTips.show({
						duration: 5000,
						title: '未找到商品信息',
						type: 'warning'
					});
				}
			}).catch(err=>{
				let message = err.data.detail?err.data.detail:err.data
				this.$refs.uTips.show({
					duration: 5000,
					title: message,
					type: 'error'
				});
			})
		},
		chackLocation(){
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
		},
	}
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.bot{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 700rpx;
	margin-top: 40rpx;
	padding: 40rpx;
	background-color: #ffffff;
}
.supplier{
	width: 700rpx;
	padding: 40rpx;
	height: auto;
	background-color: #ffffff;
	.item{
		display: flex;
		border-bottom: 2rpx dashed $u-border-color;
		.left {
			padding: 0 30rpx;
			text-align: center;
		}
		.right {
			padding: 0 30rpx;
			text-align: center;
		}
	}
}
.jingdong {
	margin-top: 40rpx;
	width: 700rpx;
	height: auto;
	background-color: #ffffff;
	display: flex;
	.left {
		padding: 0 30rpx;
		background-color: rgb(95, 148, 224); //rgb(94, 152, 225);
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		.sum {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 32rpx;
			.num {
				font-size: 80rpx;
			}
		}
		.type {
			margin-top: 25rpx;
			margin-bottom: 25rpx;
			font-size: 28rpx;
		}
	}
	.right {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
		.top {
			border-bottom: 2rpx dashed $u-border-color;
			.title {
				margin-right: 60rpx;
				line-height: 40rpx;
				.tag {
					padding: 4rpx 20rpx;
					background-color: rgb(73, 154, 201);
					border-radius: 20rpx;
					color: #ffffff;
					font-weight: bold;
					font-size: 24rpx;
					margin-right: 10rpx;
				}
			}
			.bottom {
				display: flex;
				margin-top: 20rpx;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.date {
					font-size: 20rpx;
					flex: 1;
				}
				.immediate-use {
					height: auto;
					padding: 0 20rpx;
					font-size: 24rpx;
					border-radius: 40rpx;
					line-height: 40rpx;
					color: rgb(117, 142, 165);
					border: 2rpx solid rgb(117, 142, 165);
				}
			}
		}
		.tips {
			width: 100%;
			line-height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			.transpond {
				margin-right: 10rpx;
			}
			.explain {
				display: flex;
				align-items: center;
			}
			.particulars {
				width: 30rpx;
				height: 30rpx;
				box-sizing: border-box;
				padding-top: 8rpx;
				border-radius: 50%;
				background-color: $u-type-info-disabled;
				text-align: center;
			}
		}
	}
}

</style>
