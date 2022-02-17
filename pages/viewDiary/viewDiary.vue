<template>
	<view>

		<view class="title">
			<uni-icons @click="goIndex" style="float: left;" size="24" type="left" />
			那些被你记录的点滴
		</view>
		<view v-for="(item,index) in diary" :key="index">
			<view class="date">
				{{item.date}}
				<uni-icons @click="rDetail(item,index)" size="24" type="bottom" />

			</view>
			<view class="detail" v-if="item.open==true">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diary: []
			}
		},
		mounted() {
			const self = this
			uni.request({
				method: "GET",
				url: `http://127.0.0.1:3002/api/rDiary`,
				success: (res) => {
					self.diary = res.data
				}
			})
		},
		methods: {
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			rDetail(item, index) {
				for (let i = 0; i < this.diary.length; i++) {
					if (i != index) {
						this.diary[i].open = false
					} else {
						this.diary[i].open = true
					}
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./viewDiary.css");
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';
</style>
