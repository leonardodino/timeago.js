'use strict';
const path = require('path');
const test = require('tape');
const fs = require('fs');
const testBuilder = require('./builder');

const modulePath = '../' + (process.env.MODULE_PATH || 'index.js')
const timeago = require(modulePath)

test('timeago.js should be tested', t => {
  // locale tests #################################################################
  // read all the locales test in `test/locales` dir
  fs.readdir(__dirname+'/locales', (err, files) => {
    files.forEach(file => {
      const now = new Date('2017-04-30')
      const locale = path.basename(file, '.js');
      console.log('\nLocale testcase for ['+ locale +']');
      // require in the locales testcases
      const tb = testBuilder({now, locale})
      require('./locales/' + locale)(t, tb);
    })
  });
  // end locale tests #############################################################

  // test locale, can set the locale
  t.equal(timeago({now: new Date('2017-06-23')})(new Date('2017-06-22')), '1 day ago');
  t.equal(timeago({now: new Date('2017-06-23')})(new Date('2017-06-25')), 'in 2 days');
  t.equal(timeago({now: new Date('2017-06-23'), locale: 'zh_CN'})(new Date('2017-06-22')), '1天前');
  t.equal(timeago({now: new Date('2017-06-23'), locale: 'zh_CN'})(new Date('2017-06-25')), '2天后');

  // testcase for other points
  // relative now
  t.equal(timeago()(Date.now() - 11 * 1000 * 60 * 60), '11 hours ago');

  // timestamp works
  let current = 55809291600
  t.equal(timeago({now: current})(current - 8 * 1000 * 60 * 60 * 24), '1 week ago');
  t.equal(timeago({now: current})(current - 31536000 * 1000 + 1000), '11 months ago');

  // negative timestamp works
  current = -55809291600
  t.equal(timeago({now: current})(current - 8 * 1000 * 60 * 60 * 24), '1 week ago');
  t.equal(timeago({now: current})(current - 31536000 * 1000 + 1000), '11 months ago');

  // Date()
  current = new Date('2017-06-23');
  t.equal(timeago({now: current})(current), 'just now');

  // test leap year
  t.equal(timeago({now: new Date('2016-03-01 12:00:00')})(new Date('2016-02-28 12:00:00')), '2 days ago');
  t.equal(timeago({now: new Date('2015-03-01 12:00:00')})(new Date('2015-02-28 12:00:00')), '1 day ago');

  // test default locale, leap year
  t.equal(timeago({now: new Date('2016-03-01 12:00:00')})(new Date('2016-02-28 12:00:00')), '2 days ago');
  t.equal(timeago({now: new Date('2016-03-01 12:00:00'), locale: 'zh_CN'})(new Date('2016-02-28 12:00:00')), '2天前');

  t.end();
});
