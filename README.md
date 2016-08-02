# ng-lightning

[![Build Status](https://travis-ci.org/ng-lightning/ng-lightning.svg?branch=master)](https://travis-ci.org/ng-lightning/ng-lightning)
[![Sauce Test Status](https://saucelabs.com/buildstatus/ng-lightning)](https://saucelabs.com/u/ng-lightning)
[![npm version](https://badge.fury.io/js/ng-lightning.svg)](https://www.npmjs.com/package/ng-lightning)
[![npm](https://img.shields.io/npm/dm/ng-lightning.svg?maxAge=2592000)](https://www.npmjs.com/package/ng-lightning)
[![Join the chat at https://gitter.im/ng-lightning/ng-lightning](https://badges.gitter.im/ng-lightning/ng-lightning.svg)](https://gitter.im/ng-lightning/ng-lightning?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ng-lightning.svg)](https://saucelabs.com/u/ng-lightning)

This library contains native [Angular 2](https://angular.io/) components and directives written from scratch in TypeScript using the [Lightning Design System](https://www.lightningdesignsystem.com/) CSS framework.

**This release is a developer preview.** We are looking for community help to find and fix bugs, improve demo site and create new components.

## Installation

Install through `npm`:

```bash
npm install --save ng-lightning
```

If you use **SystemJS** to load your files, you may want to use our bundle file through [npmcdn](https://npmcdn.com/)

```html
<script src="https://npmcdn.com/ng-lightning@x.x.x/ng-lightning.bundle.js"></script>
```

#### IE11 support
Unfortunately, IE11 does not support two important features.

* [SVG External Content](https://css-tricks.com/svg-use-with-external-reference-take-2/), used to load SVG icons from a spritemap. In order to support this, you will need to use a small script called [svg4everybody](https://github.com/jonathantneal/svg4everybody).  
Available on npm cdn [here](https://npmcdn.com/svg4everybody).

* `Element.classList` on SVG elements, used by Angular's `renderer.setElementClass`. See [here](https://github.com/angular/angular/issues/6327) for more information. Use [classList.js](https://github.com/eligrey/classList.js) shim, available on npm cdn [here](https://npmcdn.com/classlist.js).

Typically, these shims should be placed within the `<head>` element.  

**Note**: To prevent considerable rendering load in IE11, utilize `core-js` over `es6-shim`. See the [Angular 2 documentation](https://angular.io/docs/ts/latest/guide/npm-packages.html) for more information.

## Usage & Demo
http://ng-lightning.github.io/ng-lightning/


## Contributing

We are always looking for high quality contributions! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) doc for guidelines.


## Sponsors

Development is supported by [ZuluTrade](http://zulutrade.com/).


## Browsers

We support the same browsers and versions supported by both Angular 2 and Salesforce's Lightning Design System.  
Cross browser/environment testing is performed through [Saucelabs](https://saucelabs.com/).  
