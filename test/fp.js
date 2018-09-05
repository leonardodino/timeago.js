'use strict';
const test = require('tape');
const timeago = require('../dist/main.min.js')
const timeagoFP = require('../dist/fp.min.js')
const localeZH = require('../locales/zh_CN')
const localeEN = require('../locales/en')

test('timeago-fp should be tested', t => {
  // test locale, can set the locale
  t.equal(timeagoFP({now: new Date('2017-06-23'), locale: localeEN})(new Date('2017-06-22')), '1 day ago');
  t.equal(timeagoFP({now: new Date('2017-06-23'), locale: localeEN})(new Date('2017-06-25')), 'in 2 days');
  t.equal(timeagoFP({now: new Date('2017-06-23'), locale: localeZH})(new Date('2017-06-22')), '1天前');
  t.equal(timeagoFP({now: new Date('2017-06-23'), locale: localeZH})(new Date('2017-06-25')), '2天后');

  // testcase for other points
  // relative now
  t.equal(timeagoFP({locale: localeEN})(Date.now() - 11 * 1000 * 60 * 60), '11 hours ago');

  // timestamp works
  let current = 55809291600
  t.equal(timeagoFP({now: current, locale: localeEN})(current - 8 * 1000 * 60 * 60 * 24), '1 week ago');
  t.equal(timeagoFP({now: current, locale: localeEN})(current - 31536000 * 1000 + 1000), '11 months ago');

  // negative timestamp works
  current = -55809291600
  t.equal(timeagoFP({now: current, locale: localeEN})(current - 8 * 1000 * 60 * 60 * 24), '1 week ago');
  t.equal(timeagoFP({now: current, locale: localeEN})(current - 31536000 * 1000 + 1000), '11 months ago');

  // string date works
  current = '2013-04-11T15:00:00.000Z'
  t.equal(timeagoFP({now: current, locale: localeEN})(new Date(current)), 'just now');
  t.equal(timeagoFP({now: current, locale: localeEN})(new Date(current) - 8 * 1000 * 60 * 60 * 24), '1 week ago');
  t.equal(timeagoFP({now: current, locale: localeEN})(new Date(current) - 31536000 * 1000 + 1000), '11 months ago');

  // Date()
  current = new Date('2017-06-23');
  t.equal(timeagoFP({now: current, locale: localeEN})(current), 'just now');

  // test leap year
  t.equal(timeagoFP({now: new Date('2016-03-01 12:00:00'), locale: localeEN})(new Date('2016-02-28 12:00:00')), '2 days ago');
  t.equal(timeagoFP({now: new Date('2015-03-01 12:00:00'), locale: localeEN})(new Date('2015-02-28 12:00:00')), '1 day ago');

  // test default locale, leap year
  t.equal(timeagoFP({now: new Date('2016-03-01 12:00:00'), locale: localeEN})(new Date('2016-02-28 12:00:00')), '2 days ago');
  t.equal(timeagoFP({now: new Date('2016-03-01 12:00:00'), locale: localeZH})(new Date('2016-02-28 12:00:00')), '2天前');

  t.end();
});


test('timeago-fp should be the same as default', t => {
  const same = options => date => t.equal(timeagoFP(options)(date), timeago(options)(date))
  // test locale, can set the locale
  same({now: new Date('2017-06-23'), locale: localeEN})(new Date('2017-06-22'))
  same({now: new Date('2017-06-23'), locale: localeEN})(new Date('2017-06-25'))
  same({now: new Date('2017-06-23'), locale: localeZH})(new Date('2017-06-22'))
  same({now: new Date('2017-06-23'), locale: localeZH})(new Date('2017-06-25'))

  // testcase for other points
  // relative now
  same({locale: localeEN})(Date.now() - 11 * 1000 * 60 * 60)

  // timestamp works
  let current = 55809291600
  same({now: current, locale: localeEN})(current - 8 * 1000 * 60 * 60 * 24)
  same({now: current, locale: localeEN})(current - 31536000 * 1000 + 1000)

  // negative timestamp works
  current = -55809291600
  same({now: current, locale: localeEN})(current - 8 * 1000 * 60 * 60 * 24)
  same({now: current, locale: localeEN})(current - 31536000 * 1000 + 1000)

  // string date works
  current = '2013-04-11T15:00:00.000Z'
  same({now: current, locale: localeEN})(new Date(current))
  same({now: current, locale: localeEN})(new Date(current) - 8 * 1000 * 60 * 60 * 24)
  same({now: current, locale: localeEN})(new Date(current) - 31536000 * 1000 + 1000)

  // Date()
  current = new Date('2017-06-23');
  same({now: current, locale: localeEN})(current)

  // test leap year
  same({now: new Date('2016-03-01 12:00:00'), locale: localeEN})(new Date('2016-02-28 12:00:00'))
  same({now: new Date('2015-03-01 12:00:00'), locale: localeEN})(new Date('2015-02-28 12:00:00'))

  // test default locale, leap year
  same({now: new Date('2016-03-01 12:00:00'), locale: localeEN})(new Date('2016-02-28 12:00:00'))
  same({now: new Date('2016-03-01 12:00:00'), locale: localeZH})(new Date('2016-02-28 12:00:00'))

  t.end();
});
