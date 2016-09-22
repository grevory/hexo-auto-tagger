# hexo-auto-tagger

[![Build Status](https://travis-ci.org/grevory/hexo-auto-tagger.svg?branch=master)](https://travis-ci.org/grevory/hexo-auto-tagger) 
[![NPM version](https://badge.fury.io/js/hexo-auto-tagger.svg)](http://badge.fury.io/js/hexo-auto-tagger) 
[![Coverage Status](https://coveralls.io/repos/github/grevory/hexo-auto-tagger/badge.svg?branch=master)](https://coveralls.io/github/grevory/hexo-auto-tagger?branch=master)

Automatically add tags to a post in a Hexo blog by checking the post for predefined keywords. 

Let's say you want to tag every article that references any province of Canada with that provinces name. You could add each province name to the tag keywords in your config and if that province name appears in an article's content a tag will be automatically added to that article.

Will not add duplicate tags.

*NOTE:* This is a work in progress. Please wait for version 1.0.0.

## Installation

``` bash
$ npm install hexo-auto-tagger --save
```

Requires tag_keywords in the config in order to work. See below.

## Options

``` yaml
auto_tagger:
  tag_keywords:
  	- Gregory Pike
  	- Newfoundland & Labrador
```

**tag_keywords**: An array of keywords to search for in each post

## License

MIT