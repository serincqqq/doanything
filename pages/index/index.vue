<template>
	<view class="content" :style="{height:screenHeight+'px'}">
		<image id="title" src="../../static/img/title.png" />
		</image>
		<view id="container">
			<img id="hp" />
			<button @click="goAccount()" class="child">
				记账
			</button>
			<button @click="goAttendance()" class="child">
				打卡
			</button>
			<button @click="goDiary()" class="child">
				写日记
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		},
		data() {
			return {
				title: 'Hello',
				screenHeight: ''
			}
		},
		onLoad() {

		},
		methods: {
			goDiary(){
				uni.navigateTo({
					url:'../diary/diary'
				})
			},
			goAttendance(){
				uni.navigateTo({
					url:'../attendance/attendance'
				})
			},
			goAccount(){
				uni.navigateTo({
					url:'../account/account'
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';
</style>
