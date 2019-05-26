<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<!--
		<img alt="Vue logo" src="https://d1sz9tkli0lfjq.cloudfront.net/items/443O3Q073V1W0L3T1d1X/piggy_bank.png" class = "profile">
		-->
		<img src="https://s3-ap-northeast-1.amazonaws.com/cachetest0911/piggy_bank.png" class="profile">
		<button @click = "this.clearImageCache" width="50px"></button>
	</div>
</template>

<script>
import FileUtil from '../mixins/file.util'
export default {
	name: 'HelloWorld',
	props: {
		msg: String
	},
	mixins: [
		FileUtil
	],
	mounted () {
		this.initImageCache()
		const targets = document.querySelectorAll('img.profile')
		const self = this
		setTimeout(function	() {
			alert('test')
			targets.forEach(function (target) {
				let url = target.getAttribute('src')
				let result = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
				// if (result ===  "https://wallet-sc.imgix.net/"){ self.setImageCache() }
				console.log('1' + result)
				self.setImageCache(target)
			})
		}, 3000)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
	h3
		margin 40px 0 0

	ul
		list-style-type none
		padding 0

	li
		display inline-block
		margin 0 10px

	a
		color #42b983
</style>
