<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view/>
		<img alt="Vue logo" src="https://d1sz9tkli0lfjq.cloudfront.net/items/443O3Q073V1W0L3T1d1X/piggy_bank.png" class = "profile">
		<img src="https://s3-ap-northeast-1.amazonaws.com/cachetest0911/piggy_bank.png" class="profile">
	</div>
</template>

<script>
import FileUtil from '@/mixins/file.util'

export default {
	name: 'App',
	mixins: [
		FileUtil
	],
	mounted () {
		alert('test start')
		this.initImageCache()
		const targets = document.querySelectorAll('img.profile')
		const self = this
		setTimeout(function	() {
			alert('test')
			targets.forEach(function (target) {
				let url = target.getAttribute('src')
				let result = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
				// if (result ===  "https://wallet-sc.imgix.net/"){ self.setImageCache() }
				console.log(result)
				self.setImageCache(target)
			})
		}, 3000)
	}
}
</script>

<style lang="stylus">
#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50

#nav
	padding 60px 30px
	a
		font-weight bold
		color #2c3e50
		&.router-link-exact-active
			color #42b983
</style>
