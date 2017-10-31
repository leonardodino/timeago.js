'use strict';

const path = require('path');
const fs = require('fs');
const test = require('tape');
const modulePath = '../' + (process.env.MODULE_PATH || '');
const timeago = require(modulePath);

// all the locales code, if missing, please add them.
const allLocales = require('../locales');

function testLocales(tobeTested) {
  test('Testing locales', t => {
    tobeTested.forEach(file => {
      const localeName = path.basename(file, '.js');
      t.ok(allLocales[localeName], 'locale [' + localeName + ']');

      console.log('\nTesting locales [' + localeName + ']');

      const localeFn = require('../locales/' + localeName);
      // test locales
      let newTimeAgo = timeago({now: new Date('2016-06-23'), locale: localeName})
      t.equal(newTimeAgo(new Date('2016-06-22')), localeFn(1, 6)[0]);
      t.equal(newTimeAgo(new Date('2016-06-25')), localeFn(2, 7)[1].replace('%s', '2'));

      // test default locale
      newTimeAgo = timeago({now: new Date('2016-03-01 12:00:00'), locale: localeName});
      t.equal(newTimeAgo(new Date('2016-02-28 12:00:00')), localeFn(2, 7)[0].replace('%s', '2'));

      // test setLocale
      newTimeAgo = timeago({now: new Date('2016-03-01 12:00:00'), locale: localeName});
      t.equal(newTimeAgo(new Date('2016-02-28 12:00:00')), localeFn(2, 7)[0].replace('%s', '2'));
    });

    t.end();
  });
}

// read all the locales in `locales` dir
fs.readdir('locales', (err, files) => {
  // rm locales.js file
  const index = files.indexOf('index.js');

  if (index > -1) {
    files.splice(index, 1);
  }
  // test them
  testLocales(files);
});