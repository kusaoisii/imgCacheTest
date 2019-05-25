// mixins for cordova.file
// ==================================================
import * as ImgCache from 'imgcache.js'

export default {
	data () {
		return {
			cashe: {
				main: null
			}
		}
	},
	computed: {
	},
	mounted () {
	},
	methods: {
		initImageCache () {
			ImgCache.options.debug = true

			// increase allocated space on Chrome to 50MB, default was 10MB
			ImgCache.options.chromeQuota = 50 * 1024 * 1024
			ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory
			ImgCache.init()
		},
		setImageCache (target) {
			ImgCache.cacheFile(target.getAttribute('src'), function () {
				ImgCache.useCachedFile(target, function () {
					alert('now using local copy')
					alert('src:' + target.getAttribute('src'))
				}, function () {
					alert('could not load from cache')
				})
			})
		},
		clearImageCache () {
			ImgCache.clearCache();
		},
		set () {
			/* eslint-disable */
			const dir = cordova.file.dataDirectory
			console.log('\nPLUGIN: cordova.file')
			console.log(`cordova.file.dataDirectory:\n${dir}`)
			/* eslint-enable */
			alert('startTest')

			ImgCache.options.debug = true

			// increase allocated space on Chrome to 50MB, default was 10MB
			ImgCache.options.chromeQuota = 50 * 1024 * 1024
			ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory

			// Instead of using the PERSISTENT or TEMPORARY filesystems, use one of the
			// Cordova File plugin's app directories
			// (https://github.com/apache/cordova-plugin-file#where-to-store-files).
			// This is friendlier in a mobile application environment as we are able to store
			// files in the correct platform-recommended/enforced directories.
			// WARNING: Make sure this points to a __directory__!
			// NOTE: Only has effect when running in a Cordova environment
			//ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory
			ImgCache.init(() => {
				alert('ImgCache init: success!')
				// from within this function you're now able to call other ImgCache methods
				// or you can wait for the ImgCacheReady event
				const target = document.querySelector('img#profile')
				console.log(target.getAttribute('src'))
				ImgCache.cacheFile('')
				// use cache
				setTimeout(function () {
					ImgCache.cacheFile(target.getAttribute('src'), function () {
						ImgCache.useCachedFile(target, function () {
							alert('now using local copy')
							alert('src:' + target.getAttribute('src'))
						}, function () {
							alert('could not load from cache')
						})
					})
					alert('src:' + target.getAttribute('src'))
				}, 3000)
			}, () => {
				alert('ImgCache init: error! Check the log for errors')
			})
		}
	}
}
