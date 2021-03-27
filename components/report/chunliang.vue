<template>
<view>
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
				<text class="text-price text-red">{{((Number(sale1)) / 100).toFixed(2) }}</text>
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
		<view class="padding">联营:</view>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-red">{{(sale3 / 100).toFixed(2) }}</text>
			</view>
		</view>
	</view>
	<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode"
		:start-text="startText" :end-text="endText" :range-color="rangeColor"
		:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
	>
	</u-calendar>

	<view class="solids-bottom padding-xs flex align-center" @click="showCalendar">
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xl padding">
				<text class="text-black text-bold">日期: {{result}}</text>
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
				show:false,
				result:"请选择日期",
				mode: 'range',
				startText: '开始',
				endText: '结束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
				
                sale:0.00,
				sale1:0.00,
				sale2:0.00,
				sale3:0.00,
				startDate:this.today(-3600 * 1000 * 24),
				endDate:this.today(-1),
			}
		},
		created() {
			this.result = parseTime(this.startDate,"{y}-{m}-{d}") +" - "+ parseTime(this.endDate,"{y}-{m}-{d}")
			this.getData()	
		},
		methods: {
			getData(){
				this.getSale()
				this.getSale1()
				this.getSale2()
				this.getSale3()
			},   
			getSale(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					// where:"DepCode> 100 AND DepCode< 200",
					database: 'chunliang'
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
			getSale1(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 100 AND DepCode< 200",
					database: 'chunliang'
				}).then(res=>{
					this.sale1 = res.total
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
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 200 AND DepCode< 500",
					database: 'chunliang'
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
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 700 AND DepCode< 800",
					database: 'chunliang'
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
			},
			showCalendar(){
				this.show = true
			},
			change(e) {
				this.result = e.startDate + " - " + e.endDate;
				this.startDate = new Date(new Date(e.startDate).toLocaleDateString())
				this.endDate = new Date(new Date(new Date(e.endDate).toLocaleDateString()).getTime()+3600 * 1000 * 24-1)
				this.getData()
			}
		},
	}
</script>

<style>

</style>
