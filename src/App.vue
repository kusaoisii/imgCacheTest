<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view/>
		<img alt="Vue logo" src="https://d1sz9tkli0lfjq.cloudfront.net/items/443O3Q073V1W0L3T1d1X/piggy_bank.png" id = "profile">
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
		const target = document.querySelector('img#profile')
		console.log(target.getAttribute('src'))
		const self = this
		setTimeout(function	() {
			alert('test')
			self.setImageCache(target)
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
