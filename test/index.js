'use strict';

var Code = require('code');
var Lab = require('lab');
var Plugin = require('../');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

Code.settings.truncateMessages = false;

describe('ESLint Plugin', function() {
  it('exposes all expected rules', function(done) {
    expect(Plugin.rules).to.exist();
    expect(Plugin.rules).to.be.an.object();

    var rules = Object.keys(Plugin.rules);

    expect(rules.length).to.equal(1);
    expect(rules).to.deep.equal(['hapi-scope-start']);

    for (var i = 0; i < rules.length; ++i) {
      expect(Plugin.rules[rules[i]]).to.be.a.function();
    }

    done();
  });
});
