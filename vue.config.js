// const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const md5 = require('blueimp-md5')

const isProduction = process.env.NODE_ENV === 'production' ? true : false
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false

/**
 * 開発環境用の定数
 */
const APP_NAME = process.env.APP_NAME
const APP_VERSION = process.env.APP_VERSION
const API_STAGE = process.env.API_STAGE
const API_ENDPOINT = process.env.API_ENDPOINT
const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY
const TIME_STAMP = md5(new Date().getTime())

/**
 * 開発時のサーバ設定
 * @type {Object}
 * @see {@link https://cli.vuejs.org/config/#devserver | Vue CLI3}
 */
const SERVER_OPTION = {
	// public: '192.168.100.30:8080',
	// host: 'localhost',
	port: '8081'
}

/**
 * CSSの出力設定
 * @type {Object}
 * @see {@link https://cli.vuejs.org/config/#devserver | Vue CLI3}
 */
const OUTPUT_DIR = path.resolve('app/www')

/**
 * Assetsの出力設定
 * @type {String}
 * @see {@link https://cli.vuejs.org/config/#assetsdir | Vue CLI3}
 */
const ASSETS_DIR = 'assets'

/**
 * デプロイ時のディレクトリ指定
 * @type {String}
 * @see {@link https://cli.vuejs.org/config/#publicpath | Vue CLI3}
 */
const PUBLIC_PATH = './'

/**
 * プロダクションビルド時のソースマップの生成
 * @type {Boolean}
 * @see {@link https://cli.vuejs.org/config/#productionsourcemap | Vue CLI3}
 */
const PRODUCTION_SOURCEMAP = false

/**
 * BabelとTypescript向けのthread-loaderの設定
 * @type {Boolean}
 * @see {@link https://cli.vuejs.org/config/#parallel | Vue CLI3}
 */
const PARALLEL_OPTION = true

/**
 * CSSの出力設定
 * @type {Object}
 * @see {@link https://cli.vuejs.org/config/#css-extract | Vue CLI3}
 */
const CSS_OPTION = {
	extract: {
		filename: 'assets/css/[name].css',
		chunkFilename: 'assets/css/[name].css',
	},
	sourceMap: false
}
const CSS_EXTRACT = isProduction
	? CSS_OPTION
	: undefined

/**
 * Runtime Compiler
 * @type {Boolean}
 * @see {@link https://cli.vuejs.org/config/#runtimecompiler | Vue CLI3}
 * @see {@link https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only | vue.js}
 */
const RUNTIME_COMPLIER = false

/**
 * Subsoruce integrity
 * @type {Boolean}
 * @see {@link https://cli.vuejs.org/config/#integrity | Vue CLI3}
 */
const SUBSOURCE_INTEGRITY = false

/**
 * index.htmlの参照先を変更
 * @type {Object}
 * @see {@link https://cli.vuejs.org/config/#pages | vue-cli}
 */
const PAGE_INDEX = {
	index: {
		entry: 'src/main.js',
		template: 'src/assets/templates/index.html',
		filename: 'index.html',
		title: APP_NAME
	}
}

/**
 * 開発環境などの情報を表示
 */
console.log(`APP_NAME  : ${chalk.green(APP_NAME)}`)
console.log(`NODE_ENV  : ${chalk.green(process.env.NODE_ENV)}`)
console.log(`API_STAGE : ${chalk.green(process.env.API_STAGE)}`)
console.log(`            ${chalk.cyan(process.env.API_ENDPOINT)}\n`)

/**
 * Configuration Reference
 * @see {@link https://cli.vuejs.org/config/#vue-config-js | Vue CLI3}
 */
module.exports = {
	devServer: SERVER_OPTION,
	outputDir: OUTPUT_DIR,
	assetsDir: ASSETS_DIR,
	publicPath: PUBLIC_PATH,
	runtimeCompiler: RUNTIME_COMPLIER,
	productionSourceMap: PRODUCTION_SOURCEMAP,
	parallel: PARALLEL_OPTION,
	integrity: SUBSOURCE_INTEGRITY,
	css: CSS_EXTRACT,
	pages: PAGE_INDEX,
	configureWebpack: config => {
		/**
		 * プラグインの追加
		 */
		const plugins = [
			/**
			 * moment.jsで特定のロケールだけを追加する
			 * @see {@link https://qiita.com/jimbo/items/95da1c223ad25a33ed16 | qiita}
			 */
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja/),
			/**
			 * scriptタグにdefer属性を設置
			 * @see {@link https://github.com/jantimon/html-webpack-plugin/issues/113 | github}
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			}),
			/**
			 * assetsなどの内容をmonaca project内にコピーする
			 * @see {@link https://webpack.js.org/plugins/copy-webpack-plugin/ | github}
			 */
			new CopyWebpackPlugin([
				{ from: 'src/assets/monaca/', to: '' },
				{ from: 'src/assets/templates/manifest.json', to: 'manifest.json' }
			])
		]

		/**
		 * プラグインの追加（本番ビルド時）
		 */
		if (isProduction) {
			plugins.push(
				/**
				 * 容量の大きいファイルなどの確認
				 * @see {@link https://qiita.com/kurosame/items/9e7092cdf08ff2ba7500 | qiita}
				 */
				new BundleAnalyzerPlugin({
					analyzerMode: 'static',
					reportFilename: `../../.stats/index.html`,
					openAnalyzer: false
				})
			)
		}

		/**
		 * jsファイルの出力先を変更
		 */
		const output = {
			filename: 'assets/js/[name].js',
			chunkFilename: 'assets/js/[name].chunk.js'
		}

		return {
			plugins,
			output
		}
	},
	chainWebpack: config => {
		/**
		 * 環境変数を追加
		 * @see {@link https://cli.vuejs.org/guide/webpack.html#chaining-advanced | Vue CLI3}
		 */
 		const define = {
 			'APP_NAME': `"${APP_NAME}"`,
 			'APP_VERSION': `"${APP_VERSION}"`,
 			'API_STAGE': `"${API_STAGE}"`,
 			'API_ENDPOINT': `"${API_ENDPOINT}"`,
 			'LOCAL_STORAGE_KEY': `"${LOCAL_STORAGE_KEY}"`,
 			'TIME_STAMP': `"${TIME_STAMP}"`,
 		}
		config
			.plugin('define')
			.tap(args => {
				args[0]['process.env'] = Object.assign(args[0]['process.env'], define)
				return args
			})
	},
}
