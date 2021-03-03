<template>
	<!-- cu-bar tabbar bg-white shadow foot -->
	<view class="cu-bar tabbar bg-white shadow foot">
		<view 
			v-for="(itme,key) in tabbar"
			:key="key"
			class="action" 
			:class="[itme.click ? 'text-green' : ' text-gray', itme.action ? 'add-action':'']"
			@click="NavChange" 
			:data-cur="key"
		>
			<view :class=[itme.icon]>
				<view v-if="itme.info > 0" class="cu-tag badge">{{itme.info}}</view>
			</view> {{itme.title}}
		</view>
	    <u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	export default {
        props: {
            PageCur: {
                type: String,
                default: 'home'
            }
        },
		data() {
			return {
				tabbar:{
					home: {title: '首页', icon:'cuIcon-homefill',info:0, click: true, action: false},
					scan: {title: '扫码', icon:'cuIcon-scan',info:0, click: false, action: true},
					my: {title: '我的', icon:'cuIcon-my',info:0, click: false, action: false},
				}
			}
		},
		methods: {
			NavChange(e) {
                const cur = e.currentTarget.dataset.cur
                this.$emit('NavChange',cur)
                switch (cur) {
                    case 'scan':
                        this.scanCode()
                        break;
                    default:
                        break;
                }
				this.TabbarClick(cur)
			},
			TabbarClick(cur){
				for (const key in this.tabbar) {
					this.tabbar[key].click = false
				}
				this.tabbar[cur].click = true
			},
            scanCode() {
                uni.scanCode({
                    scanType: ['barCode'],
                    success:(res) =>{
                        switch (res.scanType) {
                            case 'EAN_13':
                                this.$emit('NavScanCodeChange',res.result)
                                break
                            default:
                                this.$refs.uTips.show({
                                    duration: 2000,
                                    title: '咱只支持EAN_13条形码',
                                    type: 'error'
                                });
                                break;
                        }
                    }
                });
            }
		}
	}
</script>

<style>
</style>
