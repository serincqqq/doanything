<template>
	<view class="choose" style="">
		<view class="chooseInput" v-if="continued">
			<input type="text" v-model="title" placeholder="请输入主题" />
			<input placeholder="请输入选项" type="text" v-model="options" />
			<button @click="produce">生成选择器</button>
		</view>
		
		<view v-if="!continued">
			<view class="zhezhao"></view>
			<view class="flip-container" @click="trans">
				<view class="flipper" :class="{flip:isActive}">
					<view class="front">
						<image class="face" src="../../static/img/xin.jpg">

						</image>
						<!-- 前面内容 -->
					</view>
					<view class="back">
						<image class="logo" src="../../static/img/彩虹.png"></image>{{title}}
						<image class="bottomLogo" src="../../static/img/小柯基.png"></image>
						<view class="title">{{result}}</view>
						<!-- <image class="bottomLogo" src="../../static/img/小柯基.png"></image> -->
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: false,
				continued: true,
				title: '',
				options: '',
				result:''
			}
		},
		methods: {
			produce(){
				this.continued=false
				let optionsArr=this.options.split(' ')
				let rand=Math.floor(Math.random()*optionsArr.length); 
				this.result=optionsArr[rand]
				console.log(rand)
			},
			trans() {
				this.isActive = true
				
			}
		}
	}
</script>

<style scoped>
	@import url("./choose.css");
</style>
