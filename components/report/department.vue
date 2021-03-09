<template>
<view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xl padding">
				<text class="text-black text-bold">日期: {{ date | parseTime('{y}-{m}-{d} 星期{a}') }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">合计:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{((Number(sale10)+Number(sale11)) / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">二楼:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale2 / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">三楼:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale3 / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼内:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale10 / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼外:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale11 / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<u-top-tips ref="uTips"></u-top-tips>
</view>
</template>

<script>
	import {parseTime} from '@/utils/index'
	export default {
		data() {
			return {
                sale:0.00,
				sale10:0.00,
				sale11:0.00,
				sale2:0.00,
				sale3:0.00,
				date: new Date()
			}
		},
		created() {
			this.init()	
		},
		methods: {
			init(){
				this.date = this.today(-3600 * 1000 * 24)
				this.getSale()
				this.getSale10()
				this.getSale11()
				this.getSale2()
				this.getSale3()
			},   
			getSale(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.today(-3600 * 1000 * 24),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.today(),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					// where:"DepCode> 100 AND DepCode< 200",
				}).then(res=>{
					this.sale = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			getSale10(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.today(-3600 * 1000 * 24),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.today(),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 100 AND DepCode< 200",
				}).then(res=>{
					this.sale10 = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			getSale11(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.today(-3600 * 1000 * 24),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.today(),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 600 AND DepCode< 700",
				}).then(res=>{
					this.sale11 = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			getSale2(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.today(-3600 * 1000 * 24),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.today(),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 900 AND DepCode< 1000",
				}).then(res=>{
					this.sale2 = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			getSale3(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.today(-3600 * 1000 * 24),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.today(),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 300 AND DepCode< 400",
				}).then(res=>{
					this.sale3 = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			// 今天的 0点 可以加减
			today(time = 0) {
				return new Date(this.dateTime() + time)
			},
			// 获取选择时间当前时区0点
			dateTime() {
				return new Date(new Date().toLocaleDateString()).getTime()
			}
		},
	}
</script>

<style>

</style>
