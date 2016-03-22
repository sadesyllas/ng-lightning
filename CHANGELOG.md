<a name="0.3.0"></a>
# [0.3.0](https://github.com/ng-lightning/ng-lightning/compare/v0.2.0...v0.3.0) (2016-03-22)


### Bug Fixes

* **demo:** properly highlight html language ([ebd8bdb](https://github.com/ng-lightning/ng-lightning/commit/ebd8bdb))
* **nglButtonIcon:** default class is not removed ([77466b3](https://github.com/ng-lightning/ng-lightning/commit/77466b3)), closes [#22](https://github.com/ng-lightning/ng-lightning/issues/22) [#23](https://github.com/ng-lightning/ng-lightning/issues/23)
* **nglModal:** support `aria-labelledby` to the modal’s heading ([607a92e](https://github.com/ng-lightning/ng-lightning/commit/607a92e)), closes [#35](https://github.com/ng-lightning/ng-lightning/issues/35)
* **nglPopover:** position call happens after all layouts have finished ([8834564](https://github.com/ng-lightning/ng-lightning/commit/8834564)), closes [#33](https://github.com/ng-lightning/ng-lightning/issues/33)
* **nglSpinner:** make container class configurable instead of required ([1175645](https://github.com/ng-lightning/ng-lightning/commit/1175645)), closes [#32](https://github.com/ng-lightning/ng-lightning/issues/32)

### Features

* **app:** add dropdowns component ([7c6b155](https://github.com/ng-lightning/ng-lightning/commit/7c6b155)), closes [#12](https://github.com/ng-lightning/ng-lightning/issues/12)
* **app:** add popovers component ([9a9b8e5](https://github.com/ng-lightning/ng-lightning/commit/9a9b8e5)), closes [#27](https://github.com/ng-lightning/ng-lightning/issues/27)
* **build:** add systemjs bundle to distribution ([a2d2b99](https://github.com/ng-lightning/ng-lightning/commit/a2d2b99))
* **build:** integrate with Saucelabs for testing ([f2272d4](https://github.com/ng-lightning/ng-lightning/commit/f2272d4))
* **demo:** add live edit button ([f7f8855](https://github.com/ng-lightning/ng-lightning/commit/f7f8855)), closes [#10](https://github.com/ng-lightning/ng-lightning/issues/10)
* **nglIcon:** ability to specify extra classes for SVG ([f8baa0b](https://github.com/ng-lightning/ng-lightning/commit/f8baa0b)), closes [#28](https://github.com/ng-lightning/ng-lightning/issues/28) [#31](https://github.com/ng-lightning/ng-lightning/issues/31)
* **util:** support generation of unique IDs ([afe628d](https://github.com/ng-lightning/ng-lightning/commit/afe628d))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/ng-lightning/ng-lightning/compare/v0.1.0...v0.2.0) (2016-03-10)


### Bug Fixes

* **buttons:** don't use default class when value is empty or not set ([66a8237](https://github.com/ng-lightning/ng-lightning/commit/66a8237)), closes [#3](https://github.com/ng-lightning/ng-lightning/issues/3)
* **NGL_CONFIG:** relative path for SVG to use application's `<base>` ([e465d69](https://github.com/ng-lightning/ng-lightning/commit/e465d69))

### Features

* **app:** add avatar component ([6b24956](https://github.com/ng-lightning/ng-lightning/commit/6b24956)), closes [#6](https://github.com/ng-lightning/ng-lightning/issues/6)
* **app:** add pagination component ([66d82cf](https://github.com/ng-lightning/ng-lightning/commit/66d82cf))
* **app:** add rating component ([f2623cc](https://github.com/ng-lightning/ng-lightning/commit/f2623cc)), closes [#8](https://github.com/ng-lightning/ng-lightning/issues/8)
* **build:** make logging level while testing configurable ([b23fb91](https://github.com/ng-lightning/ng-lightning/commit/b23fb91)), closes [#5](https://github.com/ng-lightning/ng-lightning/issues/5) [#7](https://github.com/ng-lightning/ng-lightning/issues/7)
* **config:** use `provideNglConfig` to hide bootstrapping complexity ([5b1b1ec](https://github.com/ng-lightning/ng-lightning/commit/5b1b1ec))


### BREAKING CHANGES

* config: Use `provideNglConfig` instead of `NGL_CONFIG`.

  Before:

  ```js
  import {NGL_CONFIG} from 'ng-lightning/ng-lightning';

  bootstrap(App, [
    provide(NGL_CONFIG, {useValue: {}}),
    ...
  ]);
  ```

  After:

  ```js
  import {provideNglConfig} from 'ng-lightning/ng-lightning';

  bootstrap(App, [
    provideNglConfig({...}),
    ...
  ]);
  ```



<a name="0.1.0"></a>
# [0.1.0](https://github.com/ng-lightning/ng-lightning/compare/f2bbc41...v0.1.0) (2016-03-04)


### Features

* **app:** add badge component ([e67741c](https://github.com/ng-lightning/ng-lightning/commit/e67741c))
* **app:** add button components ([4045bd3](https://github.com/ng-lightning/ng-lightning/commit/4045bd3))
* **app:** add icon component ([527b24f](https://github.com/ng-lightning/ng-lightning/commit/527b24f))
* **app:** add modal component ([c34019e](https://github.com/ng-lightning/ng-lightning/commit/c34019e))
* **app:** add tabs/tab components ([f2bbc41](https://github.com/ng-lightning/ng-lightning/commit/f2bbc41))
* **app:** add spinner component ([8cfd811](https://github.com/ng-lightning/ng-lightning/commit/8cfd811))
