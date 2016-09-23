'use strict';

module.exports = function(locals) {

  var config = this.config;
  var tagKeywords = config.auto_tagger.tag_keywords;

  return locals.posts.map(function(post) {

    tagKeywords.forEach(function(tagKeyword) {

      if (postContainsTagKeyword(post, tagKeyword)) {
        
        if (!postHasTag(post, tagKeyword)) {
          post.tags.data.push(tagKeyword);
          post.setTags(post.tags.data);
        }

      }
    });

    return post;
  });

  function postHasTag(post, tagKeyword) {
    var tags = post.tags.data;
    return tags.indexOf(tagKeyword) >= 0;
  }

  function postContainsTagKeyword(post, tagKeyword) {
    return (new RegExp(escapeRegExp(tagKeyword), 'i')).test(post.content);
  }

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
};
