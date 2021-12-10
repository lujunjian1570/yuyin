<template>
	<view class="content">
		<view class="left">
			<view class="left-title">
				素材选择
			</view>
			<view class="list">
				<scroll-view 
					:scroll-top="scrollTop" 
					scroll-y="true"
					show-scrollbar="true"
					class="scroll" 
					@scroll="scroll"
				>
						<view class="li">A</view>
						<view class="li">A</view>
						<view class="li">A</view>
						<view class="li">A</view>
						<view class="li">A</view>
				</scroll-view>
				<view class="jiantou-top"></view>
				<view class="jiantou-bottom"></view>
			</view>
			<view class="left-info">
				<image class="logo" src="/static/logo.png"></image>
				<view class="info">
					<view>
						水电费所发生的
					</view>
					<view>
						sdfdsf对方是否对
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="bg">
				
			</view>
			<view class="cur-img">
				a
			</view>
		</view>
		<view class="right">
			<image 
				class="logo" 
				v-for="(item,index) in actionList" 
				:src="item.url"
				:key="index"
				:class="{on:item.selected}"
				@click="handleChange(item.type)"
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
				actionList:[
					{
						type:'action1',
						url:"/static/logo.png",
						selected:true,
					},
					{
						type:'action2',
						url:"/static/logo.png",
						selected:false,
					},
					{
						type:'action3',
						url:"/static/logo.png",
						selected:false,
					},
				],
			}
		},
		onLoad() {
			console.log(uni.getSystemInfoSync().screenWidth)
		},
		methods: {
			handleChange(type){
				let list = this.actionList
				list.map(a=>{
					a.selected = false
					if(a.type === type){
						a.selected = true
					}
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
		padding: 20rpx;
		padding-left: calc(var(--status-bar-height) + 10px);
		overflow: hidden;
		.left{
			width: 140rpx;
			height: 100%;
			padding-left: 20rpx;
			.left-title{
				height: 20rpx;
				line-height: 20rpx;
				font-size: 10rpx;
				text-align: right;
			}
			.list{
				position: relative;
				height: calc(100% - 60rpx);
				.scroll{
					height: 100%;
					.li{
						width: 100%;
						height: 60rpx;
						margin: 5rpx 0;
						background: #808080;
					}
					.li:first-child,.li:last-child{
						margin: 0;
					}
				}
				.jiantou-top,.jiantou-bottom{
					position: absolute;
					left: -20rpx;
					width: 15rpx;
					height: 30rpx;
					background: #F0AD4E;
				}
				.jiantou-top{
					top: 0;
				}
				.jiantou-bottom{
					bottom: 0;
				}
			}
			.left-info{
				display: flex;
				height: 40rpx;
				margin-top: 10rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 4rpx;
				}
				.info{
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					font-size: 10rpx;
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
			.bg{
				width: 100%;
				height: 100%;
				background: #C8C7CC;
			}
			.cur-img{
				position: absolute;
				top: 0;
				left: 0;
				width: 80%;
				height: 80%;
				background: #555555;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 40px;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 5rpx 0;
				border: 1rpx solid transparent;
				&.on{
					border: 1rpx solid #007AFF;
				}
			}
		}
	}
</style>
