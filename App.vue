<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// plus.screen.lockOrientation('landscape-primary'); //锁定
			wx.cloud.init({
				// env 参数说明：
				//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
				//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
				//   如不填则使用默认环境（第一个创建的环境）    
				//env: '你的环境ID',
				env: 'movie-test-qiqjo',
				traceUser: true,
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page,view{
		box-sizing: border-box;
	}
	page{
		height: 100%;
	}
	.line{
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  display: block;
	}
	.line2{
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 2;
	  line-clamp: 2;
	  -webkit-box-orient: vertical;
	}
</style>
