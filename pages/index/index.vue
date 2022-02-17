<template>
	<view class="content" :style="{height:screenHeight+'px'}">
		<image id="title" src="../../static/img/title.png" />
		</image>
		<view id="container">
			<!-- 获取token验证登陆情况，如果登陆就显示头像，没有的话就显示小字（你还没有登录哦，点击登录） -->
			<!-- <view>你还没有登录哦，点我登录</view>
			-->

			<img id="hp" v-if="!imgUrl==''" :src="imgUrl" />

			<button class="login" v-if="imgUrl==''" form-type="submit" open-type="getUserInfo"
				@getuserinfo="getuserinfo" withCredentials="true">
				你还没有登录哦，点击登录</button>

			<button @click="goAccount()" class="child">
				记账
			</button>
			<button @click="goAttendance()" class="child">
				打卡
			</button>
			<button @click="goDiary()" class="child">
				写日记
			</button>
			<button @click="goChoose()" class="child">
				做选择
			</button>
			<view @click="rDiary" class="viewDiary">查看日记</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			//在页面载入时发送axios请求判断有没有token，有的话获取，没有的话点击授权
			const self = this
			uni.getStorage({
				key: 'storage_tx',
				success: function(res) {
					console.log(res.data)
					self.imgUrl = res.data
				}
			})
		},
		data() {
			return {
				title: 'Hello',
				screenHeight: '',
				imgUrl: ''
				//imgUrl:'http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIwAzovQrYichHIiaWLiaobt5lNwG2vUfqtKHffvXbzeIV9hUzF1WSYptImSbuexh1iaMZHgK5NOy6WEg/132'
			}
		},
		onLoad() {

		},
		methods: {
			goChoose(){
				uni.navigateTo({
					url: '../choose/choose'
				})
			},
			rDiary(){
				uni.navigateTo({
					url: '../viewDiary/viewDiary'
				})
			},
			goDiary() {
				uni.navigateTo({
					url: '../diary/diary'
				})
			},
			goAttendance() {
				uni.navigateTo({
					url: '../date/date'
				})
			},
			getuserinfo() {
				// wx登录
				const self = this
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							var code = res.code
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(res) {
									var userInfo = res.userInfo
									var nickName = userInfo.nickName
									var avatarUrl = userInfo.avatarUrl
									var gender = userInfo.gender //性别 0：未知、1：男、2：女
									var province = userInfo.province
									var city = userInfo.city
									var country = userInfo.country
									//console.log(avatarUrl)
									self.imgUrl = avatarUrl
									console.log(self.imgUrl)
									uni.setStorage({
										key: 'storage_tx',
										data: avatarUrl,
										success: function() {
											console.log('success');
										}
									})
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})

						} else {
							uni.showToast({
								title: '请检查网络连接',
								duration: 2000
							});
						}
					}
				})
			},

			goAccount() {
				uni.navigateTo({
					url: '../account/account'
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';
</style>
