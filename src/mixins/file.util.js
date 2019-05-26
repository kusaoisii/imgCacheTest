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
			ImgCache.isCached(target.getAttribute('src'), function (path , success) {
				if (success) {
					alert("あったから使うよ")
					ImgCache.useCachedFile(target)
					console.log('---' + target.getAttribute('src'))
				} else {
					ImgCache.cacheFile(target.getAttribute('src'), function () {
						ImgCache.useCachedFile(target, function () {
							alert("なかったから作ったよw")
						})
					})
				}
			})
		},
		clearImageCache () {
			ImgCache.clearCache();
		}
	}
}
