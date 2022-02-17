<template>
	<view class="date">
		<view @click="goIndex" class="backIndex">
			<uni-icons  size="26" type="left" />
		</view>
		
		<view class="box">
			<view class="year">当前年份是：{{year}}</view>
			<scroll-view scroll-x="true">

				<block v-for="(item, index) in dayList" :key="index">
					<view class="dayTitle" :class="current == index ? 'select' : ''" @click="timeSelectd(index)">
						<view
							style="display: flex;flex-direction: column;justify-content: center;width: 100%;height: 100%;">
							<view>{{item.month}}/{{ item.day }}</view>
							<view v-if="index == 0" style="font-size: 25upx;">今天</view>
							<view v-else style="font-size: 25upx;">星期{{ item.week }}</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

		<view class="today">{{today}}
			<text @click="showdiv" class="icon iconfont icon-editor">
				添加打卡任务
			</text>
		</view>

		<view v-show="showDialog" id="bg"></view>

		<view v-show="showDialog" id="show">
			<input type="text" v-model="newtask" placeholder="输入要添加的项目" />
			<view class="btn">
				<span class="add" size="mini" @click="addTask()">确定添加</span>
				<span class="cancel" size="mini" @click="hidediv()">取消</span>
			</view>
		</view>

		<!-- 	<text @click="inputTask" class="icon iconfont icon-gouxuankuang"></text> -->
		<view class="link-top"></view>

		<view class="title">未完成的任务</view>
		<view @click="toFinish(index,item)" class="task" v-for="(item,index) in unfinished" :key="index">
			<text class="icon iconfont icon-gouxuankuang"></text>
			{{item.task}}
		</view>
		<!--输入框，输入想添加的任务 -->

		<view class="link-top"></view>
		<view class="title">已完成的任务</view>
		<view class="task" v-for="(item,index) in finished" :key="index">
			<text class="icon iconfont icon-yigouxuan"></text>
			{{item.task}}
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import common from '../../static/common.js';
	export default {
		data() {
			return {
				isShow: false,
				current: 0,
				dayList: [],
				year: '',
				/* xzTime: common.GetNowTime(new Date()), */
				unfinished: [],
				finished: [],
				showDialog: false,
				newtask: '',
				today: ''
			};
		},
		onLoad() {
			const self = this
			this.dayList = common.weekDate().dayList;
			this.year = common.weekDate().year;

			let date = this.dayList[0].year + '-' + this.dayList[0].month + '-' + this.dayList[0].day;
			date = common.GetNowTime(new Date(date));
			this.today = date
			console.log(date)
			const status1 = 'finished'
			uni.request({
				method: "GET",
				url: `http://127.0.0.1:3002/api/rAttendance/${status1}&${date}`,
				success: (res) => {
					self.finished = res.data
				}
			})
			const status2 = 'unfinished'
			uni.request({
				method: "GET",
				url: `http://127.0.0.1:3002/api/rAttendance/${status2}&${date}`,
				success: (res) => {
					self.unfinished = res.data
				}
			})
		},
		methods: {
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			showdiv() {
				this.showDialog = true

			},
			hidediv() {
				this.showDialog = false
			},
			addTask() {
				const self = this
				let flag = true
				this.showDialog = false
				this.unfinished.forEach((item) => {
					if (self.newtask == item.task) {
						flag = false
					}
				})
				/*添加任务之前先做一次判断，判断两个数组里面是否 */
				//	console.log(this.finished.)
				if (flag) {
					uni.request({
						method: "POST",
						url: `http://127.0.0.1:3002/api/addTask`,
						data: {
							task: self.newtask,
							status: 'unfinished',
							date: self.today
						},
						success: (res) => {
							let successTask = {
								task: self.newtask,
								status: 'unfinished',
								date: self.today
							}
							//console.log(res.data)
							this.unfinished.push(successTask)
						}
					})
				} else {
					uni.showToast({
						title: '你输入的任务已存在',
						icon: 'none',
						duration: 1000
					})
				}
			},
			toFinish(index, item) {
				//console.log(index,item)
				let updateTask = this.unfinished[index].task
				let temp = this.unfinished.splice(index, 1)

				this.finished.push(...temp)
				uni.request({
					method: "POST",
					url: `http://127.0.0.1:3002/api/finishTask`,
					data: {
						task: updateTask
					},
					success: (res) => {
						console.log(res.data);
					}
				})
			},
			// 日期选择
			timeSelectd(index) {
				this.current = index;
				let date = this.dayList[index].year + '-' + this.dayList[index].month + '-' + this.dayList[index].day;
				date = common.GetNowTime(new Date(date));
				this.today = date
				const self = this
				const status1 = 'finished'
				uni.request({
					method: "GET",
					url: `http://127.0.0.1:3002/api/rAttendance/${status1}&${date}`,
					success: (res) => {
						self.finished = res.data
					}
				})
				const status2 = 'unfinished'
				uni.request({
					method: "GET",
					url: `http://127.0.0.1:3002/api/rAttendance/${status2}&${date}`,
					success: (res) => {
						if (res.data.length == 0) {
							uni.showToast({
								title: '你还没有制定今日任务哦，快去制定吧~',
								icon: 'none',
								duration: 3000
							})
						}
						self.unfinished = res.data
					}
				})
			}
		}
	};
</script>

<style scoped>
	@import url("./date.css");
</style>
