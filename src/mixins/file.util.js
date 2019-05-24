// mixins for cordova.file
// ==================================================
export default {
	data () {
		return {
		}
	},
	computed: {
	},
	mounted () {
		this.set()
	},
	methods: {
		set () {
			/* eslint-disable */
			const dir = cordova.file.dataDirectory
			console.log('\nPLUGIN: cordova.file')
			console.log(`cordova.file.dataDirectory:\n${dir}`)
			/* eslint-enable */
		}
	}
}
