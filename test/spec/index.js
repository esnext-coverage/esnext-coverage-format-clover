/* eslint no-sync: 0 */

import fs from 'fs';
import path from 'path';
import test from 'tape';
import {stub} from 'sinon';
import cloverReporter from '../../src';

test('should generate a Clover report file in XML', t => {
  t.plan(1);
  const coverageFixturePath = path.resolve(__dirname, '../fixtures/coverage.json');
  const cloverFixturePath = path.resolve(__dirname, '../fixtures/clover.xml');

  const coverageFixture = fs.readFileSync(coverageFixturePath, 'utf8');
  const cloverFixture = fs.readFileSync(cloverFixturePath, 'utf8').trim();

  stub(Date, 'now').returns(123456789000);
  const clover = cloverReporter(JSON.parse(coverageFixture));
  Date.now.restore();

  t.equal(
    clover.toString(),
    cloverFixture,
    'Generated report is equal to the fixture'
  );
});
