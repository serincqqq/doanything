<template>
	<view style="height: 100vh;background-color: #F8EEE7;display: flex;flex-direction: column;">
		<uni-icons @click="goIndex" size="26" type="left" class="back" />
		<view class="account">

			<view class="content">
				<text v-if="image1==''" @click="uploadImg" class="icon iconfont icon-_xiangji"></text>
				<image v-if="!image1==''" :src="image1"></image>
			</view>

			<view class="upload">{{uploadStatus}}</view>
			<input placeholder="输入物品价格" v-model="price" class="input" type="text" />
			<span @click="postCount">确定√</span>
			<span @click="reset">重置×</span>
		</view>
		<view class="history" @click="goHistory">
			<text class="icon iconfont icon-lishijilu"></text>
			查看历史记录
		</view>

	</view>
</template>

<script>
	import time from '../../static/time.js'
	export default {
		data() {
			return {
				image1: '',
				price: '',
				uploadStatus: '',
				focus: true
			}
		},
		onLoad() {

		},
		methods: {
			goHistory() {
				uni.navigateTo({
					url: '../countHistory/countHistory'
				})
				
			},
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			reset() {
				this.price = ''
				this.image1 = ''
			},
			uploadImg() {
				let that = this

				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'],
					//这要注意，camera调拍照，album是打开手机相册
					success: (res) => {
						console.log(res.tempFilePaths)
						that.image1 = res.tempFilePaths;
					}
				});
			},
			postCount() {
				this.uploadStatus = '上传中...'

				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				console.log(time)
				const self = this
				uni.request({
					method: "POST",
					url: 'http://127.0.0.1:3002/api/wCount',
					data: {
						price: Number(self.price),
						uploaddate: time,
						imgUrl: self.image1
					},
					success: (res) => {
						self.image1 = ''
						console.log(res.data);
						self.uploadStatus = '上传成功'
					}
				})
			}
		}
	}
</script>


<style scoped>
	@import url("./account.css");
</style>
