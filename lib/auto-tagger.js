/* global hexo */
'use strict';

module.exports = function(locals) {
  var config = this.config;
  var tagKeywords = config.auto_tagger.tag_keywords;

  hexo.extend.generator.register('post', function(locals) {

    return locals.posts.map(function(post) {

      tagKeywords.forEach(function(tagKeyword) {

        if (postContainsTagKeyword(post, tagKeyword)) {

          post.tags.data.push(tagKeyword);
          post.setTags(post.tags.data);

        }
      });

      return post;
    });
  });

  function postContainsTagKeyword(post, tagKeyword) {
    return (new RegExp(escapeRegExp(tagKeyword))).test(post.content);
  }

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
};
