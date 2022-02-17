<template>
	<view id="history">

		<view class="title">
			<uni-icons style="float: left;" @click="goIndex" size="26" type="left" />
			历史记录
		</view>

		<text @click="dateSort" class="icon iconfont icon-paixu">按日期排序</text>

		<view class="record" v-for="(item, index) in count" :key="index">
			<image :src="item.imgUrl"></image>
			<view class="information">
				<view>价格：{{item.price}}
					<text class="icon iconfont icon-jinbi"></text>
				</view>
				<view>记账日期：{{item.uploaddate}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: []
			}
		},
		mounted() {
			const self = this
			uni.request({
				method: "GET",
				url: 'http://127.0.0.1:3002/api/rCount',
				success: (res) => {
					self.count = res.data
				},
			})
		},
		methods: {
			dateSort() {
				function dateData(property) { //property是你需要排序传入的key,bol为true时是升序，false为降序
					return function(a, b) {
						var value1 = a[property];
						var value2 = b[property];

						return Date.parse(value2) - Date.parse(value1)
					}
				}
				this.count=this.count.sort(dateData("uploaddate"))
			//	console.log()
			},
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style scoped>
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';
	@import url("./countHistory.css");
</style>
