<template>
	<view>
		<!-- <view class="" v-if="continued">
			<input type="text" :value="title" />
			<input type="text" :value="options" />
			<button @click="trans">生成选择器</button>
		</view> -->
		<button @click="produce">click</button>
		<view v-if="!continued">
			<view class="zhezhao"></view>
			<view class="flip-container" @click="trans">
				<view class="flipper" :class="{flip:isActive}">
					<view class="front">
						<image src="../../static/img/xin.jpg">
			
						</image>
						<!-- 前面内容 -->
					</view>
					<view class="back">
						title
						<view class="title">txxxt</view>
			
			
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
				continued:true
			}
		},
		methods: {
			trans() {
				this.isActive = true
			},
			produce(){
				this.continued=false
			}
		}
	}
</script>

<style scoped>
	.title {
		line-height: 600rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.back {
		transform: rotateY(180deg);
		font-size: 36rpx;
		padding: 36rpx;
		color: #cf6766;
		background-color: #fff7c0;
	}

	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
	}

	.flip-container {
		z-index: 999;
		perspective: 1000;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

	}

	.flip-container,
	.front,
	.back,
	image {
		width: 450rpx;
		height: 650rpx;
	}

	image {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	/* flip speed goes here */
	.flipper {
		transition: 0.6s;
		transform-style: preserve-3d;

		position: relative;
	}

	/* hide back of pane during swap */
	.front,
	.back {
		backface-visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	.front {
		z-index: 2;
	}

	.flip {
		transform: rotateY(180deg);
	}
</style>
