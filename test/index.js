'use strict';

var should = require('chai').should(); // eslint-disable-line
var Hexo = require('hexo');

describe('Auto Tagger', function() {

  var hexo;
  var Post;
  var autoTagger;

  beforeEach(function() {
    hexo = new Hexo(__dirname, {silent: true});
    Post = hexo.model('Post');
    autoTagger = require('../lib/auto-tagger').bind(hexo);

    // Default config
    hexo.config.auto_tagger = {
      tag_keywords: ['Newfoundland & Labrador', 'Ontario', 'Target']
    };
  });

  it('does not add tags', function() {

    Post.insert([
      {
        id: 'c111111111111111111111111',
        source: 'no-tags',
        slug: 'no-tags',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.tags.data;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('no-tags');
      // Validate the tags for this post
      tags.length.should.eql(0);
      tags.should.eql([]);
    });
  });

  it('adds a single tag', function() {

    Post.insert([
      {
        id: 'c111111111111111111111112',
        source: 'single-tag',
        slug: 'single-tag',
        content: 'Newfoundland & Labrador, lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.testTags;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('single-tag');
      // Validate the tags for this post
      tags.length.should.eql(1);
      tags[0].should.eql('Newfoundland & Labrador');
    });
  });

  it('adds a single tag again', function() {

    Post.insert([
      {
        id: 'c111111111111111111111113',
        source: 'single-tag-mid',
        slug: 'single-tag-mid',
        content: 'Lorem ipsum dolor sit amet, Ontario consectetur adipiscing elit.'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.testTags;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('single-tag-mid');
      // Validate the tags for this post
      tags.length.should.eql(1);
      tags[0].should.eql('Ontario');
    });
  });

  it('adds a single tag with no space boundary', function() {

    Post.insert([
      {
        id: 'c111111111111111111111114',
        source: 'single-tag-attached',
        slug: 'single-tag-attached',
        content: 'Lorem ipsum dolor sit amet, retargeting consectetur adipiscing elit.'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.testTags;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('single-tag-attached');
      // Validate the tags for this post
      tags.length.should.eql(1);
      tags[0].should.eql('Target');
    });
  });

  it('adds multiple tags', function() {

    Post.insert([
      {
        id: 'c111111111111111111111115',
        source: 'multiple-tags',
        slug: 'multiple-tags',
        content: 'Lorem ipsum Newfoundland & Labrador as well as Ontario dolor sit amet, consectetur adipiscing elit.'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.testTags;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('multiple-tags');
      // Validate the tags for this post
      tags.length.should.eql(2);
      tags[0].should.eql('Newfoundland & Labrador');
      tags[1].should.eql('Ontario');
    });
  });

  it('adds tags despite case', function() {

    Post.insert([
      {
        id: 'c111111111111111111111116',
        source: 'mixed-case',
        slug: 'mixed-case',
        content: 'Lorem ipsum newfoundland & labrador dolor sit amet, onTario consectetur adipiscing elit. -TARGET'
      }
    ]).then(function() {

      var locals = hexo.locals.toObject();
      locals.isTest = true;

      autoTagger(locals);

      var post = locals.posts.data[0];
      var tags = post.testTags;

      // Make sure we have the right post before we validate the tags
      post.slug.should.eql('mixed-case');
      // Validate the tags for this post
      tags.length.should.eql(3);
      tags[0].should.eql('Newfoundland & Labrador');
      tags[1].should.eql('Ontario');
      tags[2].should.eql('Target');
    });
  });
});
