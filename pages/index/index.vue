<template>
	<view class="content">
		<view class="left">
			<view class="left-title">
				<image 
					v-if="categoryInfo.isBack" 
					class="back" 
					src="../../static/back.jpeg"
					@click="handleBack"
				></image>
				<view class="word line" :class="{on:categoryInfo.isBack}">
					{{categoryInfo.title}}
				</view>
			</view>
			<view class="list">
				<scroll-view 
					:scroll-top="scrollTop" 
					scroll-y="true"
					show-scrollbar="true"
					class="scroll" 
					@scroll="scroll"
				>
						<view 
							v-for="(item,index) in list"
							:key="index"
							class="li"
							:class="{on:item.selected}"
							@click="liChange(item)"
						 >
							<image mode="aspectFill" :lazy-load="true" :src="item.url"></image>
							<view class="li-word line">{{item.title}}</view>
						</view>
				</scroll-view>
				<image class="jiantou-top" src="../../static/jt-top.jpeg"></image>
				<image class="jiantou-bottom" src="../../static/jt-bottom.jpeg"></image>
			</view>
			<view class="left-info">
				<image src="/static/logo.png"></image>
				<view class="info">
					<view>
						御印浮雕肌理画版权所有
					</view>
					<view>
						Copyright@2021关于我们
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="bg">
				<image :src="bgImg"></image>
			</view>
			<view class="cur-img">
				<image mode="aspectFill" :src="params.url"></image>
			</view>
			<view class="cur-title">
				{{params.title}}
			</view>
		</view>
		<view class="right">
			<image 
				v-for="(item,index) in actionList" 
				:src="item.url"
				:key="index"
				:class="{on:item.selected}"
				@click="handleChange(item)"
			>
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				bgImg:'/static/bg-big.png',
				actionList:[
					{
						type:'big',
						url:"/static/big.jpg",
						bg:'/static/bg-big.png',
						selected:true,
					},
					{
						type:'keting',
						url:"/static/keting.jpg",
						bg:'/static/keting.jpg',
						selected:false,
					},
					{
						type:'xuanguan',
						url:"/static/xuanguan.jpg",
						bg:'/static/xuanguan.jpg',
						selected:false,
					},
				],
				ajaxList:[
					{
						title:'H系列-生化机甲风',
						url:'/static/img1.jpeg',
						children:[
							{
								title:'title1-1',
								url:'/static/img1.jpeg',
							},
							{
								title:'title1-2',
								url:'/static/img1.jpeg',
							},
						],
					},
					{
						title:'title2',
						url:'/static/img1.jpeg',
						children:[
							{
								title:'title2-1',
								url:'/static/img1.jpeg',
							},
							{
								title:'title2-2',
								url:'/static/img1.jpeg',
							},
						],
					},
					{
						title:'title3',
						url:'/static/img1.jpeg',
						children:[
							{
								title:'title3-1',
								url:'/static/img1.jpeg',
							},
							{
								title:'title3-2',
								url:'/static/img1.jpeg',
							},
							{
								title:'title3-3',
								url:'/static/img1.jpeg',
							},
							{
								title:'title3-4',
								url:'/static/img1.jpeg',
							},
						],
					},
					{
						title:'title4',
						url:'/static/img1.jpeg',
						children:[
							{
								title:'title4-1',
								url:'/static/img1.jpeg',
							},
							{
								title:'title4-2',
								url:'/static/img1.jpeg',
							},
							{
								title:'title4-3',
								url:'/static/img1.jpeg',
							},
							{
								title:'title4-4',
								url:'/static/img1.jpeg',
							},
						],
					},
				],
				dataList:[
					{
						title:'素材选择',
						list:[]
					}
				],
				list:[],//当前显示的数据列表
				params:{},
				categoryInfo:{},
			}
		},
		watch:{
			dataList:{
				deep:true,
				handler(newval){
					let lastList = newval[newval.length - 1]
					this.list = JSON.parse(JSON.stringify(lastList.list))
					this.params = {
						title:this.list[0].children?this.list[0].children[0].title:this.list[0].title,
						url:this.list[0].children?this.list[0].children[0].url:this.list[0].url,
					}
					this.categoryInfo = {
						title:lastList.title,
						isBack:newval.length>1
					}
					this.list.map(a=>{
						this.$set(a,'selected',false)
						if(!a.children && a.title === this.params.title){
							this.$set(a,'selected',true)
						}
					})
				}
			}
		},
		onLoad() {
			// console.log(uni.getSystemInfoSync().screenWidth)
			//访问微信云数据库
			//1.调用获取默认环境的数据库的引用：
			let db = wx.cloud.database({
				evn: 'movie-test-qiqjo'
			})
			//2.调用 get 方法获取通知的数据：
			db.collection('comment').get({
				success: function(res) {
					console.log(res)
					/* uni.showToast({
						title:res.errMsg,
						icon:'none'
					}) */
				}
			})
			
			this.dataList[0].list = this.ajaxList
		},
		methods: {
			liChange(item){
				if(item.children){
					this.dataList.push({
						title:item.title,
						list:item.children
					})
					this.goTop()
				}else{
					this.list.map(a=>{
						this.$set(a,'selected',false)
					})
					this.$set(item,'selected',true)
					this.params = {
						title:item.title,
						url:item.url,
					}
				}
			},
			handleBack(){
				this.dataList.pop()
				this.goTop()
			},
			handleChange(item){
				this.bgImg = item.bg
				let list = this.actionList
				list.map(a=>{
					a.selected = false
					if(a.type === item.type){
						a.selected = true
					}
				})
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10rpx 20rpx;
		padding-left: calc(var(--status-bar-height) + 10px);
		overflow: hidden;
		.left{
			width: 160rpx;
			height: 100%;
			padding-left: 20rpx;
			.left-title{
				display: flex;
				align-items: center;
				width: 100%;
				height: 30rpx;
				padding: 0 14rpx;
				line-height: 30rpx;
				.back{
					width: 16rpx;
					height: 16rpx;
				}
				.word{
					flex: 1;
					font-size: 14rpx;
					text-align: right;
					font-weight: bold;
					color: #1c1d1d;
					letter-spacing: 4rpx;
					&.on{
						font-size: 12rpx;
						color: #535554;
						letter-spacing: 0;
					}
				}
			}
			.list{
				position: relative;
				height: calc(100% - 80rpx);
				width: 100%;
				padding: 0 10rpx;
				.scroll{
					height: 100%;
					.li{
						position: relative;
						height: 60rpx;
						margin: 6rpx 6rpx 6rpx 4rpx;
						border-radius: 8rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 8rpx;
						}
						.li-word{
							position: absolute;
							width: 100%;
							left: 0;
							bottom: 0;
							font-size: 12rpx;
							line-height: 18rpx;
							color: #fff;
							text-align: center;
							background: rgba(50,50,50,0.6);
							border-radius: 0 0 8rpx 8rpx;
						}
						&.on::after{
							content: '';
							position: absolute;
							top: -2rpx;
							left: -2rpx;
							width: 100%;
							height: 60rpx;
							border: 2rpx solid #ff0101;
							border-radius: 10rpx;
						}
					}
					.li:first-child{
						margin-top: 2rpx;
					}
					.li:last-child{
						margin-bottom: 2rpx;
					}
				}
				.jiantou-top,.jiantou-bottom{
					position: absolute;
					left: -12rpx;
					width: 14rpx;
					height: 57rpx;
				}
				.jiantou-top{
					top: 10rpx;
				}
				.jiantou-bottom{
					bottom: 10rpx;
				}
			}
			.left-info{
				display: flex;
				margin-top: 5rpx;
				image{
					width: 40rpx;
					height: 41rpx;
					margin-right: 2rpx;
				}
				.info{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					font-size: 8rpx;
				}
				.info view:last-child{
					margin-top: 2rpx;
				}
			}
		}
		.center{
			display: flex;
			flex: 1;
			position: relative;
			height: 100%;
			margin: 0 10rpx;
			flex-direction: column;
			background-color: #fff;
			.bg{
				width: 100%;
				height: 100%;
				background: #C8C7CC;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.cur-img{
				position: absolute;
				top: 10%;
				left: 10%;
				width: 80%;
				height: 80%;
				background: #555555;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.cur-title{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 24rpx;
				line-height: 24rpx;
				font-size: 14rpx;
				text-align: center;
				color: #fff;
				background: rgba(50,50,50,0.6);
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin: 5rpx;
				border: 1rpx solid transparent;
				border-radius: 50%;
				filter: grayscale(100%);
				&.on{
					filter: grayscale(0%);
				}
			}
		}
	}
</style>
