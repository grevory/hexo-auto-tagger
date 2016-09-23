'use strict';

var should = require('chai').should(); // eslint-disable-line
var Hexo = require('hexo');

describe('Auto Tagger', function() {

  var hexo = new Hexo(__dirname, {silent: true});
  var Post = hexo.model('Post');
  var autoTagger = require('../lib/auto-tagger').bind(hexo);
  var locals;
  var posts;

  // Default config
  hexo.config.auto_tagger = {
    tag_keywords: ['Newfoundland & Labrador', 'Ontario', 'Target']
  };

  before(function() {

    return Post.insert([
      {
        source: 'no-tags',
        slug: 'no-tags',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        source: 'single-tag',
        slug: 'single-tag',
        content: 'Newfoundland & Labrador, lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        source: 'single-tag-mid',
        slug: 'single-tag-mid',
        content: 'Lorem ipsum dolor sit amet, Ontario consectetur adipiscing elit.'
      },
      {
        source: 'single-tag-attached',
        slug: 'single-tag-attached',
        content: 'Lorem ipsum dolor sit amet, retargeting consectetur adipiscing elit.'
      },
      {
        source: 'multiple-tags',
        slug: 'multiple-tags',
        content: 'Lorem ipsum Newfoundland & Labrador as well as Ontario dolor sit amet, consectetur adipiscing elit.'
      },
      {
        source: 'mixed-case',
        slug: 'mixed-case',
        content: 'Lorem ipsum newfoundland & labrador dolor sit amet, onTario consectetur adipiscing elit. -TARGET'
      },
      {
        source: 'existing-tags',
        slug: 'existing-tags',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Newfoundland & Labrador',
        tags: ['Nova Scotia']
      }
    ])
    // .then(function(data) {
    //   posts = data;

    //   // One test needs existing tags
    //   return posts[0].setTags([])
    //     .then(function(){
    //       return posts[1].setTags([]);
    //     })
    //     .then(function(){
    //       return posts[2].setTags([]);
    //     })
    //     .then(function(){
    //       return posts[3].setTags([]);
    //     })
    //     .then(function(){
    //       return posts[4].setTags([]);
    //     })
    //     .then(function(){
    //       return posts[5].setTags([]);
    //     })
    //     .then(function(){
    //       return posts[6].setTags(['Nova Scotia']);
    //     });
    // })
    .then(function() {
      locals = hexo.locals.toObject();
    });
  });

  it('does not add tags', function() {

    autoTagger(locals);

    var post = locals.posts.data[0];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('no-tags');
    // Validate the tags for this post
    tags.length.should.eql(0);
    tags.should.eql([]);
  });

  it('adds a single tag', function() {

    autoTagger(locals);

    var post = locals.posts.data[1];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('single-tag');
    // Validate the tags for this post
    tags.length.should.eql(1);
    tags.should.eql(['Newfoundland & Labrador']);
  });

  it('adds a single tag again', function(){

    autoTagger(locals);

    var post = locals.posts.data[2];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('single-tag-mid');
    // Validate the tags for this post
    tags.length.should.eql(1);
    tags.should.eql(['Ontario']);
  });

  it('adds a single tag with no space boundary', function(){

    autoTagger(locals);

    var post = locals.posts.data[3];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('single-tag-attached');
    // Validate the tags for this post
    tags.length.should.eql(1);
    tags.should.eql(['Target']);
  });

  it('adds multiple tags', function(){

    autoTagger(locals);

    var post = locals.posts.data[4];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('multiple-tags');
    // Validate the tags for this post
    tags.length.should.eql(2);
    tags.should.eql(['Newfoundland & Labrador', 'Ontario']);
  });

  it('adds tags despite case', function(){

    autoTagger(locals);

    var post = locals.posts.data[5];
    var tags = post.tags.data;

    // Make sure we have the right post before we validate the tags
    post.slug.should.eql('mixed-case');
    // Validate the tags for this post
    tags.length.should.eql(3);
    tags.should.eql(['Newfoundland & Labrador', 'Ontario', 'Target']);
  });

//   it('adds tags when there are existing tags', function(){

//     autoTagger(locals);

//     var post = locals.posts.data[6];
//     // post.setTags(['Nova Scotia']);
//     var tags = post.tags.data;
// console.log('---TAGS', tags);
//     // Make sure we have the right post before we validate the tags
//     post.slug.should.eql('existing-tags');
//     // Validate the tags for this post
//     tags.length.should.eql(2);
//     tags.should.eql(['Nova Scotia', 'Newfoundland & Labrador']);
//   });

});
