'use strict';

module.exports = function(locals) {

  var config = this.config;
  var tagKeywords = config.auto_tagger.tag_keywords;

  return locals.posts.map(function(post) {
    
    var postTagData = post.tags.data.slice();

    tagKeywords.forEach(function(tagKeyword) {

      if (postContainsTagKeyword(post, tagKeyword)) {
        post.setTags([tagKeyword]);
          if (locals.isTest && !post.testTags || post.testTags.indexOf(tagKeyword) < 0) {
            post.testTags = post.testTags || [];
            post.testTags.push(tagKeyword);
          }
      }
    });
    return post;
  });

  function postHasTag(post, tagKeyword) {
    var tags = post.tags.data;
    return !!tags.filter(function(tag){
      return tag.name === tagKeyword;
    }).length;
  }

  function postContainsTagKeyword(post, tagKeyword) {
    return (new RegExp(escapeRegExp(tagKeyword), 'i')).test(post.content);
  }

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
};
