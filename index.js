'use strict'
const locales = require('./locales')
const DEFAULT_LOCALE = 'en'
const SEC_ARRAY = [60, 60, 24, 7, 365/7/12, 12]
const SEC_ARRAY_LEN = 6

const formatDiff = (diff, locale, options) => {
	const agoin = diff < 0 ? 1 : 0
	let i = 0
	let abs = Math.abs(diff)

	for(; abs >= SEC_ARRAY[i] && i < SEC_ARRAY_LEN; i++){
		abs /= SEC_ARRAY[i]
	}

	abs = parseInt(abs, 10)

	i *= 2

	if(abs > (i === 0 ? 9 : 1)){
		i += 1
	}

	return locale(abs, i, options)[agoin].replace('%s', abs)
}

const getLocale = (locale = DEFAULT_LOCALE) => {
	const type = typeof locale
	if(type === 'function') return locale
	if(type === 'string' && locales[locale]) return locales[locale]
	if(locales[DEFAULT_LOCALE]) return locales[DEFAULT_LOCALE]
	throw new Error('locale "'+locale+'" not found!')
}

const getTime = now => {
	const type = typeof now
	if(type === 'number') return now
	if(type === 'string'){
		const date = (new Date(now)).getTime()
		if(isFinite(date)) return date
	}
	if(now instanceof Date) return now.getTime()
	return Date.now()
}

const format = ({now, locale: l, options}={}) => date => {
	const locale = getLocale(l)
	const diff = getTime(now) - getTime(date)
	return formatDiff(diff/1000, locale, options)
}

module.exports = format
