<template>
	<view class="bg">
		<view v-if="!finish">
			<uni-icons @click="goIndex" size="26" type="left" class="back" />
			<view class="confirm" @click="sendDiary">确认√</view>
			<view class="text">
				<textarea v-model="diary.content" id="box" :maxlength="len" cols="100" rows="100">
			</textarea>
			</view>
			<view style="display: flex;">
				<image mode="aspectFill" :style="{height:screenHeight+'px'}" src="../../static/img/xz1.jpg">
				</image>
			</view>

		</view>
		<view v-if="finish" class="zz">
			<text class="icon iconfont icon-a-youxiangdianziyouxiang"></text>
			<span class="fgx"> = = = = = = = = =</span>
			<text class="icon iconfont icon-a-Emaildianziyoujianxinfenglianxi"></text>
			<p>你的日记已经被存放到了时光邮局</p>

			<view class="link-top"></view>
			<view @click="goIndex" class="backIndex">返回首页</view>
			<view @click="write" class="write">再写一封</view>
		</view>
	</view>

</template>

<script>
	export default {
		mounted() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			this.len = Math.floor(uni.getSystemInfoSync().windowHeight * 1.5)

		},
		data() {
			return {
				screenHeight: '',
				imageURL: '/static/img/xz2.jpg',
				len: '',
				finish: false,
				diary: {
					//为用户id前两位+日期年月日+i增
					id: 1,
					content: ''
				}
			}
		},
		methods: {
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			write() {
				this.finish = true
			},
			sendDiary() {
				const self = this
				this.finish = true
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				console.log(self.diary.content)
				uni.request({
					method: "POST",
					url: 'http://127.0.0.1:3002/api/wDiary',
					data: {
						content: self.diary.content,
						date: time,
						updateDate: time
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

<style>
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';
	@import url("./diary.css");
</style>
