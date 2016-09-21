'use strict';

var should = require('chai').should(); // eslint-disable-line
var Hexo = require('hexo');

describe('Tag generator', function() {
  var hexo = new Hexo(__dirname, {silent: true});
  var Post = hexo.model('Post');
  var posts;
  // var autoTagger = require('../lib/auto-tagger').bind(hexo);
  // var locals;

  // Default config
  hexo.config.auto_tagger = ['Tag Keyword'];

  before(function() {
    return Post.insert([
      {source: 'foo', slug: 'foo', date: 1e8},
      {source: 'bar', slug: 'bar', date: 1e8 + 1},
      {source: 'baz', slug: 'baz', date: 1e8 - 1},
      {source: 'boo', slug: 'boo', date: 1e8 + 2}
    ]).then(function(data) {
      posts = data;

      return posts[0].setTags(['foo']).then(function() {
        return posts[1].setTags(['bar']);
      }).then(function() {
        return posts[2].setTags(['foo']);
      }).then(function() {
        return posts[3].setTags(['foo']);
      });
    }).then(function() {
      // locals = hexo.locals.toObject();
    });
  });
});
