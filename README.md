# hexo-auto-tagger
Automatically add tags to a post in a Hexo blog by checking the post for predefined keywords

[![Build Status](https://travis-ci.org/grevory/hexo-auto-tagger.svg?branch=master)](https://travis-ci.org/grevory/hexo-auto-tagger)  [![NPM version](https://badge.fury.io/js/hexo-auto-tagger.svg)](http://badge.fury.io/js/hexo-auto-tagger) [![Coverage Status](https://img.shields.io/coveralls/grevory/hexo-auto-tagger.svg)](https://coveralls.io/r/grevory/hexo-auto-tagger?branch=master)

Tag generator for [Hexo].

## Installation

NOTE: This is a work in progress

``` bash
$ npm install hexo-auto-tagger --save
```

## Options

``` yaml
auto_tagger:
  tag_keywords:
  	- Gregory Pike
  	- Newfoundland & Labrador
```

- **tag_keywords**: An array of keywords to search for in each post

## License

MIT