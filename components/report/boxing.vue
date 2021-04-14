<template>
<view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">合计:</view>
		<text v-bind:class="((sale-lastSale)/lastSale)>0?'text-red':'text-green'"> {{ ((sale-lastSale)/lastSale*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{ toThousands((sale / 100).toFixed(2)) }}</text> 
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale / 100).toFixed(2)) }}</text>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼:</view>
		<text v-bind:class="((sale1-lastSale1)/lastSale1)>0?'text-red':'text-green'"> {{ ((sale1-lastSale1)/lastSale1*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{toThousands((sale1 / 100).toFixed(2)) }}</text>
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale1/ 100).toFixed(2)) }}</text>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">二楼:</view>
		<text v-bind:class="((sale2-lastSale2)/lastSale2)>0?'text-red':'text-green'"> {{ ((sale2-lastSale2)/lastSale2*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{toThousands((sale2 / 100).toFixed(2)) }}</text>
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale2/ 100).toFixed(2)) }}</text>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">三楼:</view>
		<text v-bind:class="((sale3-lastSale3)/lastSale3)>0?'text-red':'text-green'"> {{ ((sale3-lastSale3)/lastSale3*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{toThousands((sale3 / 100).toFixed(2)) }}</text>
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale3/ 100).toFixed(2)) }}</text>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼内:</view>
		<text v-bind:class="((sale10-lastSale10)/lastSale10)>0?'text-red':'text-green'"> {{ ((sale10-lastSale10)/lastSale10*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{toThousands((sale10 / 100).toFixed(2)) }}</text>
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale10/ 100).toFixed(2)) }}</text>
	</view>
	<view class="solids-bottom padding-xs flex align-center">
		<view class="padding">一楼外:</view>
		<text v-bind:class="((sale11-lastSale11)/lastSale11)>0?'text-red':'text-green'"> {{ ((sale11-lastSale11)/lastSale11*100).toFixed(2)+"%" }}</text>
		<view class="flex-sub text-center">
			<view class="solid-bottom text-xxl padding">
				<text class="text-price text-cyan">{{toThousands((sale11 / 100).toFixed(2)) }}</text>
			</view>
		</view>
		<text class="text-price text-yellow text-xl">{{ toThousands((lastSale11/ 100).toFixed(2)) }}</text>
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
				// 今年销售额
                sale:0.00,
				sale10:0.00,
				sale11:0.00,
				sale2:0.00,
				sale3:0.00,
				startDate:this.today(-3600 * 1000 * 24),
				endDate:this.today(-1),
				// 去年售额
				lastSale:0.00,
				lastSale10:0.00,
				lastSale11:0.00,
				lastSale2:0.00,
				lastSale3:0.00,
			}
		},
		computed: {
			sale1() {
				return Number(this.sale10)+Number(this.sale11)
			},
			lastSale1() {
				return Number(this.lastSale10)+Number(this.lastSale11)
			},
		},
		created() {
			this.result = parseTime(this.startDate,"{y}-{m}-{d}") +" - "+ parseTime(this.endDate,"{y}-{m}-{d}")
			this.getData()	
		},
		methods: {
			getData(){
				this.getSale()
				this.getSale10()
				this.getSale11()
				this.getSale2()
				this.getSale3()
			},   
			getSale(){
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					// where:"DepCode> 100 AND DepCode< 200",
					database: 'boxing'
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
				//去年
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.lastToday(this.startDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.lastToday(this.endDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					// where:"DepCode> 100 AND DepCode< 200",
					database: 'boxing'
				}).then(res=>{
					this.lastSale = res.total
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
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 100 AND DepCode< 200",
					database: 'boxing',
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
				//去年
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.lastToday(this.startDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.lastToday(this.endDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 100 AND DepCode< 200",
					database: 'boxing'
				}).then(res=>{
					this.lastSale10 = res.total
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
					startDate: parseTime(this.startDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.endDate,"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 600 AND DepCode< 700",
					database: 'boxing',
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
				//去年
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.lastToday(this.startDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.lastToday(this.endDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 600 AND DepCode< 700",
					database: 'boxing'
				}).then(res=>{
					this.lastSale11 = res.total
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
					where:"DepCode> 900 AND DepCode< 1000",
					database: 'boxing',
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
				//去年
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.lastToday(this.startDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.lastToday(this.endDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 900 AND DepCode< 1000",
					database: 'boxing'
				}).then(res=>{
					this.lastSale2 = res.total
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
					where:"DepCode> 300 AND DepCode< 400",
					database: 'boxing',
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
				this.$u.api.DepartmentSale({
					startDate: parseTime(this.lastToday(this.startDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					endDate:  parseTime(this.lastToday(this.endDate),"{y}-{m}-{d}T{h}:{i}:{s}+08:00"),
					where:"DepCode> 300 AND DepCode< 400",
					database: 'boxing'
				}).then(res=>{
					this.lastSale3 = res.total
				}).catch(err=>{
					let message = err.data.detail?err.data.detail:err.data
					this.$refs.uTips.show({
						duration: 5000,
						title: message,
						type: 'error'
					});
				})
			},
			showCalendar(){
				this.show = true
			},
			change(e) {
				this.result = e.startDate + " - " + e.endDate;
				this.startDate = new Date(new Date(e.startDate).toLocaleDateString())
				this.endDate = new Date(new Date(new Date(e.endDate).toLocaleDateString()).getTime()+3600 * 1000 * 24-1)
				this.getData()
			},
			// 去年的今天可以加减
			lastToday(today) {
				const day = new Date(today) // 防止深拷贝
				return new Date(day.setMonth(
					day.getMonth() - 12
				))
			},
			// 今天的 0点 可以加减
			today(time = 0) {
				return new Date(this.dateTime() + time)
			},
			// 获取选择时间当前时区0点
			dateTime() {
				return new Date(new Date().toLocaleDateString()).getTime()
			},
			toThousands(s,n) {
				n = n > 0 && n <= 20 ? n : 2;  
				s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
				let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
				let t = "";  
				for (let i = 0; i < l.length; i++) {  
					t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
				}  
				return t.split("").reverse().join("") + "." + r;  
			},
		},
	}
</script>

<style>
.padding{
	padding:10rpx;
}
</style>
