/* global hexo, require */
'use strict';

hexo.extend.generator.register('post', require('./lib/auto-tagger'));
