import { useData, useMounted, useState, useEffect, useComputed, useUpdated, useDestroyed} from 'vue-hooks'

export function toggleHook () {

	const data = useData({
		delta: 0,
		mc: {},
		dialogHS: `auto`,
		dialogLimitHS: 500
	})

	const styleHeight = useComputed(() => {
		return {
			height: data.dialogHS
		}
	})

	useMounted(()=> {
	})

	useUpdated(()=> {
	})

	useDestroyed(()=> {
		// component内のmethodが使えるか不明
		window.removeEventListener('resize', this.reflow, false)
		if (Object.keys(this.mc).length) {
			_.forEach(this.mc, (_touch, _key) => {
				if (_touch !== null && _touch !== undefined) {
					this.mc[_key].destroy()
					delete this.mc[_key]
				}
			})
		}
	})

	useEffect(()=> {
	})

	return {
		data,
		styleHeight
	}

}
