<template>
	<view class="content">
		<view class="left">
			<view class="list">
				<scroll-view 
					:scroll-top="scrollTop" 
					scroll-y="true"
					show-scrollbar="true"
					class="scroll" 
					@scroll="scroll"
				>
						<view>A</view>
				</scroll-view>
			</view>
		</view>
		<view class="right">
			<view class="banner">
				<swiper 
					class="swiper" 
					:indicator-dots="true" 
				>
					<swiper-item>
							<view class="swiper-item">
								<image class="img" src="/static/logo.png"></image>
							</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item">B</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item">C</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="action">
				a
			</view>
		</view>
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				statusBarHeight:0,
				scrollTop: 0,
				toBottom: 'toBottom',
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		padding-left: calc(var(--status-bar-height) + 10px);
		overflow: hidden;
		.left{
			width: 30%;
			height: 100%;
			.list{
				height: 100%;
				.scroll{
					height: 100%;
				}
			}
		}
		.right{
			display: flex;
			flex: 1;
			height: 100%;
			flex-direction: column;
			.banner{
				width: 100%;
				height: calc(100% - 60rpx);
				.swiper{
					height: 100%;
					.swiper-item{
						width: 100%;
						height: 100%;
						.img{
							width: 100%;
							height: 100%;
							object-fit: contain;
						}
					}
				}
			}
			.action{
				
			}
		}
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 12rpx;
		color: #8f8f94;
	}
</style>
