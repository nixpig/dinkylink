'use strict';

const ws = require('..');
const assert = require('assert').strict;

assert.strictEqual(ws(), 'Hello from ws');
console.info('ws tests passed');
