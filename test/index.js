'use strict';

var should = require('chai').should(); // eslint-disable-line
var Hexo = require('hexo');

describe('Auto Tagger', function() {
  var hexo = new Hexo(__dirname, {silent: true});
  var Post = hexo.model('Post');
  var posts;
  var autoTagger = require('../lib/auto-tagger').bind(hexo);
  var locals;

  // Default config
  hexo.config.auto_tagger = {
    tag_keywords: ['Tag Keyword', 'Test']
  };

  before(function() {
    return Post.insert([
      {source: 'foo', slug: 'foo', date: 1e8, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
      {source: 'bar', slug: 'bar', date: 1e8 + 1, content: 'Keyword Lorem ipsum dolor sit amet, Tag consectetur adipiscing elit.'},
      {source: 'baz', slug: 'baz', date: 1e8 - 1, content: 'Lorem ipsum dolor sit amet, Tag Keyword consectetur test adipiscing elit.'},
      {source: 'boo', slug: 'boo', date: 1e8 + 2, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Test'}
    ])
    .then(function() {
      locals = hexo.locals.toObject();
    });
  });

  describe('first post', function(){
    it('does not add tags', function(){
      
      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.tags.data;
      
      post.tags.length.should.eql(0);
      tags.length.should.eql(0);
      tags.should.eql([]);
    });
  });

  describe('second post', function(){
    it('does not add tags', function(){
      
      autoTagger(locals);

      var post = locals.posts.data[1];
      var tags = post.tags.data;
      
      post.tags.length.should.eql(0);
      tags.length.should.eql(0);
      tags.should.eql([]);
    });
  });

  // describe('third post', function(){
  //   it('adds multiple tags', function(){
      
  //     autoTagger(locals);

  //     var post = locals.posts.data[2];
  //     var tags = post.tags.data;
      
  //     post.tags.length.should.eql(2);
  //     tags.length.should.eql(2);
  //     // tags.should.eql(['Tag Keyword', 'Test']);
  //   });
  // });

});
