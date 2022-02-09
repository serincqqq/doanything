<template>
	<view class="bg">
		<view v-if="!finish">
			<uni-icons size="26" type="left" class="back" />
			<view class="confirm" @click="sendDiary">确认√</view>
			<view class="text">
				<textarea v-model="diary.content" id="box" :maxlength="len" cols="20" rows="50">
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
	/* import axios from '../../static/utils/axios.js' */
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
			goIndex(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			write(){
				this.finish = true
			},
			sendDiary() {
				this.finish = true
				Date.prototype.Format = function(fmt) { //author: meizz
					var o = {
						"M+": this.getMonth() + 1, //月份 
						"d+": this.getDate(), //日 
						"H+": this.getHours(), //小时 
						"m+": this.getMinutes(), //分 
						"s+": this.getSeconds(), //秒 
						"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
						"S": this.getMilliseconds() //毫秒 
					};
					if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1
						.length));
					for (var k in o)
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
							(o[
								k]) : (("00" + o[k]).substr(("" + o[k]).length)));
					return fmt;
				}
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				/* uni.request({
				    url: 'http://127.0.0.1:3002/api/gettodos', //仅为示例，并非真实接口地址。
				    success: (res) => {
				        console.log(res.data);
				      
				    }
				}); */
			}
		}
	}
</script>

<style>
	@import '~@/static/font/ACGN-SetoPopGB-Flash.css';

	p {
		font-family: "ACGN-SetoPopGB-Flash";
		position: absolute;
		top: 150px;
		left: 90px;
	}

	.fgx {
		position: absolute;
		top: 100px;
		left: 140px;
		color: #007AFF;
	}

	.link-top {
		position: absolute;
		top: 180px;
		width: 100%;
		height: 2px;
		border-top: solid #ACC0D8 2px;
	}

	.text {
		margin: 0 auto;
	}

	.zz {
		height: 100vh;
		width: 100%;
		background-color: #f8eee7;
		z-index: 99;
		position: relative;
	}

	.paper {
		z-index: 999;
		height: 300px;
		width: 200px;
		background-color: #C09F80;
	}

	.bg {
		position: relative;
		margin: 0 auto;
	}

	.back {
		position: absolute;
		top: 180rpx;
		left: 24px;
		color: #C09F80;
		font-size: 28px;
		font-weight: bold;
	}

	.backIndex {
		text-decoration: underline;
		font-style: italic;
		position: absolute;
		top: 200px;
		left: 120px;
		color: #C09F80;
		font-size: 18px;
	}

	.write {
		text-decoration: underline;
		font-style: italic;
		position: absolute;
		top: 200px;
		right: 120px;
		color: #C09F80;
		font-size: 18px;
	}

	.confirm {
		text-decoration: underline;
		font-style: italic;
		position: absolute;
		top: 180rpx;
		right: 22px;
		color: #C09F80;
		font-size: 24px;
		font-family: ;
	}

	#box {
		font-family: "ACGN-SetoPopGB-Flash";
		height: 70vh;
		padding: 30px;
		position: absolute;
		top: 300rpx;
		font-size: 20px;
	}

	image {
		width: 100%;
		vertical-align: bottom;
		height: 100vh;
	}
</style>
