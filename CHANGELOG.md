<a name="0.12.0"></a>
# [0.12.0](https://github.com/ng-lightning/ng-lightning/compare/v0.11.1...v0.12.0) (2016-06-17)


### Bug Fixes

* **NglBreadcrumbs:** make breadcrumbs markup compatible with v2.0 ([8377b5e](https://github.com/ng-lightning/ng-lightning/commit/8377b5e))
* **NglIcon:** make custom icons compatible with v2.0 ([d5bac96](https://github.com/ng-lightning/ng-lightning/commit/d5bac96))
* **NglLookup:** make lookup markup compatible with v2.0 ([bc653dd](https://github.com/ng-lightning/ng-lightning/commit/bc653dd))
* **NglPill:** make compatible with v2.0 ([d5f0434](https://github.com/ng-lightning/ng-lightning/commit/d5f0434)), closes [#122](https://github.com/ng-lightning/ng-lightning/issues/122)


### Features

* **app:** support alternate radio & checkbox group component ([278f97e](https://github.com/ng-lightning/ng-lightning/commit/278f97e)), closes [#123](https://github.com/ng-lightning/ng-lightning/issues/123)
* **app:** upgrade SLDS to v2.0 ([91502ea](https://github.com/ng-lightning/ng-lightning/commit/91502ea))
* **forms:** support `<template>` element as label ([f9d85b5](https://github.com/ng-lightning/ng-lightning/commit/f9d85b5)), closes [#127](https://github.com/ng-lightning/ng-lightning/issues/127)
* **lookup:** support custom item template for results ([3732a5a](https://github.com/ng-lightning/ng-lightning/commit/3732a5a)), closes [#66](https://github.com/ng-lightning/ng-lightning/issues/66) [#130](https://github.com/ng-lightning/ng-lightning/issues/130)


### BREAKING CHANGES

* app: `ngl-form-group-element` should be added as attribute on a `<label>`

  Before:

  ```html
  <ngl-form-group-element>...</ngl-form-group-element>
  ```

  After:
  ```html
  <label ngl-form-group-element>...</label>
  ```
* NglPill: `ngl-pill` is now an element instead of attribute and `<a>` moved inside content

  Before:

  ```html
  <a href="..." nglPill>
    <ngl-icon nglPillImage></ngl-icon>With icon
  </a>
  ```

  After:
  ```html
  <ngl-pill>
    <ngl-icon nglPillImage></ngl-icon>
    <a href="...">With icon</a>
  </ngl-pill>
  ```



<a name="0.11.1"></a>
## [0.11.1](https://github.com/ng-lightning/ng-lightning/compare/v0.11.0...v0.11.1) (2016-06-08)


### Bug Fixes

* **NglFormElement:** don't let form directives leak on whole app ([4be0c3c](https://github.com/ng-lightning/ng-lightning/commit/4be0c3c)), closes [#120](https://github.com/ng-lightning/ng-lightning/issues/120)



<a name="0.11.0"></a>
# [0.11.0](https://github.com/ng-lightning/ng-lightning/compare/v0.10.1...v0.11.0) (2016-06-07)


### Bug Fixes

* **util:** namespace automatically generated IDs ([3ca0956](https://github.com/ng-lightning/ng-lightning/commit/3ca0956))


### Features

* **app:** add checkbox form component ([b7a4673](https://github.com/ng-lightning/ng-lightning/commit/b7a4673)), closes [#115](https://github.com/ng-lightning/ng-lightning/issues/115)
* **app:** add input form component ([f159037](https://github.com/ng-lightning/ng-lightning/commit/f159037)), closes [#112](https://github.com/ng-lightning/ng-lightning/issues/112)
* **app:** add radio & checkbox group component ([5b306ec](https://github.com/ng-lightning/ng-lightning/commit/5b306ec)), closes [#117](https://github.com/ng-lightning/ng-lightning/issues/117)
* **app:** add select form component ([5489cb6](https://github.com/ng-lightning/ng-lightning/commit/5489cb6)), closes [#114](https://github.com/ng-lightning/ng-lightning/issues/114)
* **app:** add textarea form component ([9d14331](https://github.com/ng-lightning/ng-lightning/commit/9d14331)), closes [#113](https://github.com/ng-lightning/ng-lightning/issues/113)



<a name="0.10.1"></a>
## [0.10.1](https://github.com/ng-lightning/ng-lightning/compare/v0.10.0...v0.10.1) (2016-06-01)


### Bug Fixes

* **build:** define `ts-helpers` as dependency ([7a5bde3](https://github.com/ng-lightning/ng-lightning/commit/7a5bde3))
* **NglPopover:** explicitly destroy popover when host is destroyed ([fb4f325](https://github.com/ng-lightning/ng-lightning/commit/fb4f325)), closes [#111](https://github.com/ng-lightning/ng-lightning/issues/111)



<a name="0.10.0"></a>
# [0.10.0](https://github.com/ng-lightning/ng-lightning/compare/v0.9.0...v0.10.0) (2016-05-30)


### Bug Fixes

* **NglDatepicker:** input/output Date object instead of string ([aec4e07](https://github.com/ng-lightning/ng-lightning/commit/aec4e07))
* **NglPopover:** fix memory leak when hiding ([b869c03](https://github.com/ng-lightning/ng-lightning/commit/b869c03)), closes [#107](https://github.com/ng-lightning/ng-lightning/issues/107)


### Features

* **app:** add datepicker component ([c77afde](https://github.com/ng-lightning/ng-lightning/commit/c77afde)), closes [#86](https://github.com/ng-lightning/ng-lightning/issues/86)
* **NglDatepicker:** add option to show "Today" button ([c26bdf4](https://github.com/ng-lightning/ng-lightning/commit/c26bdf4)), closes [#108](https://github.com/ng-lightning/ng-lightning/issues/108)
* **NglPopover:** support reusable `<template>` elements ([6b49cc0](https://github.com/ng-lightning/ng-lightning/commit/6b49cc0)), closes [#106](https://github.com/ng-lightning/ng-lightning/issues/106)


### Performance Improvements

* **NglBreadcrumbs:** use `onPush` as change detection strategy ([3d9053f](https://github.com/ng-lightning/ng-lightning/commit/3d9053f))
* **NglPill:** use `onPush` as change detection strategy ([e0fb26c](https://github.com/ng-lightning/ng-lightning/commit/e0fb26c)), closes [#104](https://github.com/ng-lightning/ng-lightning/issues/104)


### BREAKING CHANGES

* NglPopover:   
  * `nglPopoverTrigger` renamed to `nglPopover`
  * `nglPlacement` renamed to `nglPopoverPlacement`
  * Theme and tooltip declarations are now input of `nglPopover`

  Before:

  ```html
  <ngl-popover #tip theme="success">my text</ngl-popover>
  <span [nglPopoverTrigger]="tip" [nglPlacement]="placement" ...>here</span>
  ```

  After:
  ```html
  <template #tip>my text</template>
  <span [nglPopover]="tip" [nglPopoverPlacement]="placement" nglPopoverTheme="success" ...>here</span>
  ```



<a name="0.9.0"></a>
# [0.9.0](https://github.com/ng-lightning/ng-lightning/compare/v0.8.0...v0.9.0) (2016-05-20)


### Bug Fixes

* **NglPagination:** add `trackBy` on page elements ([0491b1e](https://github.com/ng-lightning/ng-lightning/commit/0491b1e)), closes [#98](https://github.com/ng-lightning/ng-lightning/issues/98)
* **NglPagination:** don't keep internal state of current page ([87eb763](https://github.com/ng-lightning/ng-lightning/commit/87eb763)), closes [#93](https://github.com/ng-lightning/ng-lightning/issues/93)


### Features

* **build:** improve SystemJS bundle size ([91f9d54](https://github.com/ng-lightning/ng-lightning/commit/91f9d54)), closes [#89](https://github.com/ng-lightning/ng-lightning/issues/89)
* **NglPagination:** support always visible boundary numbers ([ede3bf1](https://github.com/ng-lightning/ng-lightning/commit/ede3bf1)), closes [#92](https://github.com/ng-lightning/ng-lightning/issues/92)
* **NglPagination:** support First/Last buttons ([6d04c1b](https://github.com/ng-lightning/ng-lightning/commit/6d04c1b)), closes [#95](https://github.com/ng-lightning/ng-lightning/issues/95)
* **NglTabs:** support more verbose syntax for "richer" heading ([c195d52](https://github.com/ng-lightning/ng-lightning/commit/c195d52)), closes [#103](https://github.com/ng-lightning/ng-lightning/issues/103)


### BREAKING CHANGES

* NglTabs: `nglTabId` is now a separate input

  Before:

  ```html
  <template ngl-tab="myid" ...></template>
  ```

  After:
  ```html
  <template ngl-tab nglTabId="myid" ...></template>
  ```



<a name="0.8.0"></a>
# [0.8.0](https://github.com/ng-lightning/ng-lightning/compare/v0.7.0...v0.8.0) (2016-05-12)


### Bug Fixes

* **build:** import from `rxjs/Rx` to avoid SystemJS issues ([2cd7f96](https://github.com/ng-lightning/ng-lightning/commit/2cd7f96)), closes [#80](https://github.com/ng-lightning/ng-lightning/issues/80)


### Features

* **NglLookup:** support single selection ([b5f1013](https://github.com/ng-lightning/ng-lightning/commit/b5f1013)), closes [#79](https://github.com/ng-lightning/ng-lightning/issues/79)
* **NglTab:** add `exportAs` ([f63646b](https://github.com/ng-lightning/ng-lightning/commit/f63646b)), closes [#84](https://github.com/ng-lightning/ng-lightning/issues/84)
* **NglTab:** support template as heading ([93fa880](https://github.com/ng-lightning/ng-lightning/commit/93fa880)), closes [#85](https://github.com/ng-lightning/ng-lightning/issues/85)


### BREAKING CHANGES

* NglLookup: `pick` is now two way binded

  Before:

  ```html
  <ngl-lookup (pick)="selected = $event" ...></ngl-lookup>
  ```

  After:
  ```html
  <ngl-lookup [(pick)]="selected" ...></ngl-lookup>
  ```



<a name="0.7.0"></a>
# [0.7.0](https://github.com/ng-lightning/ng-lightning/compare/v0.6.0...v0.7.0) (2016-04-19)


### Bug Fixes

* **app:** deprecate `ngl-icon-button` in favour of `ngl-icon` ([339f867](https://github.com/ng-lightning/ng-lightning/commit/339f867)), closes [#70](https://github.com/ng-lightning/ng-lightning/issues/70)
* **nglPillImage:** handle `ngl-icon` and `ngl-avatar` ([4be9e09](https://github.com/ng-lightning/ng-lightning/commit/4be9e09)), closes [#74](https://github.com/ng-lightning/ng-lightning/issues/74)

### Code Refactoring

* **NglIcon:** move sprite definition into component from `NglConfig` ([62c3eec](https://github.com/ng-lightning/ng-lightning/commit/62c3eec))

### Features

* **app:** add notification component ([2b94946](https://github.com/ng-lightning/ng-lightning/commit/2b94946)), closes [#65](https://github.com/ng-lightning/ng-lightning/issues/65)
* **NglIcon:** support all available sprites ([04e6f64](https://github.com/ng-lightning/ng-lightning/commit/04e6f64)), closes [#73](https://github.com/ng-lightning/ng-lightning/issues/73)
* **NglNotification:** add timeout support ([78e0e6b](https://github.com/ng-lightning/ng-lightning/commit/78e0e6b)), closes [#75](https://github.com/ng-lightning/ng-lightning/issues/75)


### BREAKING CHANGES

* NglIcon: Don't include `utility-sprite` into `svgPath` of `NglConfig`
* app: Rename `<ngl-icon-button>` to `<ngl-icon>`

  Before:

  ```html
  <ngl-icon-button icon="add" ...></ngl-icon-button>
  ```

  After:
  ```html
  <ngl-icon icon="add" ...></ngl-icon>
  ```



<a name="0.6.0"></a>
# [0.6.0](https://github.com/ng-lightning/ng-lightning/compare/v0.5.0...v0.6.0) (2016-04-11)


### Bug Fixes

* **NglDropdown:** apply picklist styles if used in conjunction with `nglPick` ([36302b2](https://github.com/ng-lightning/ng-lightning/commit/36302b2)), closes [#64](https://github.com/ng-lightning/ng-lightning/issues/64)
* **NglIcon:** provide a way to omit default text type ([9428d56](https://github.com/ng-lightning/ng-lightning/commit/9428d56)), closes [#58](https://github.com/ng-lightning/ng-lightning/issues/58) [#61](https://github.com/ng-lightning/ng-lightning/issues/61)
* **NglPill:** existence of `nglPillRemove` determines removability ([1095a26](https://github.com/ng-lightning/ng-lightning/commit/1095a26)), closes [#63](https://github.com/ng-lightning/ng-lightning/issues/63)

### Features

* **app:** add pill component ([f922e09](https://github.com/ng-lightning/ng-lightning/commit/f922e09)), closes [#50](https://github.com/ng-lightning/ng-lightning/issues/50) [#59](https://github.com/ng-lightning/ng-lightning/issues/59)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/ng-lightning/ng-lightning/compare/v0.4.0...v0.5.0) (2016-04-07)


### Bug Fixes

* **NglPick:** change `activeClass` to `nglPickActiveClass` and support on `nglPick` ([9837f6f](https://github.com/ng-lightning/ng-lightning/commit/9837f6f))
* **NglRating:** prevent icons from wrapping ([664e595](https://github.com/ng-lightning/ng-lightning/commit/664e595))

### Features

* **app:** add lookup component ([c4ea74e](https://github.com/ng-lightning/ng-lightning/commit/c4ea74e)), closes [#48](https://github.com/ng-lightning/ng-lightning/issues/48)
* **demo:** add a picklist example inside menus ([14ebd03](https://github.com/ng-lightning/ng-lightning/commit/14ebd03)), closes [#51](https://github.com/ng-lightning/ng-lightning/issues/51) [#57](https://github.com/ng-lightning/ng-lightning/issues/57)
* **NglLookup:** support aria attributes and keyboard selection ([28a0ad6](https://github.com/ng-lightning/ng-lightning/commit/28a0ad6)), closes [#53](https://github.com/ng-lightning/ng-lightning/issues/53)
* **NglPickOption:** add `exportAs` ([8314999](https://github.com/ng-lightning/ng-lightning/commit/8314999)), closes [#56](https://github.com/ng-lightning/ng-lightning/issues/56)
* **NglPickOption:** add aria role and keyboard interaction ([add94a1](https://github.com/ng-lightning/ng-lightning/commit/add94a1)), closes [#55](https://github.com/ng-lightning/ng-lightning/issues/55)
* **NglRating:** support custom size ([c4b7abd](https://github.com/ng-lightning/ng-lightning/commit/c4b7abd)), closes [#47](https://github.com/ng-lightning/ng-lightning/issues/47)


### BREAKING CHANGES

* NglPick:   Before:

  ```html
  <div [(nglPick)]="selected">
    ...
    <button type="button" nglPickOption="..." activeClass="custom-class"></button>
  ```

  After:
  ```html
  <div [(nglPick)]="selected" nglPickActiveClass="slds-button--brand">
    ...
    <button type="button" nglPickOption="..." nglPickActiveClass="custom-class"></button>
  </div>
  ```



<a name="0.4.0"></a>
# [0.4.0](https://github.com/ng-lightning/ng-lightning/compare/v0.3.0...v0.4.0) (2016-03-30)


### Bug Fixes

* **NglBreadcrumbs:** support `aria-labelledby` for assistive text ([0167009](https://github.com/ng-lightning/ng-lightning/commit/0167009))
* **nglDropdown:** set class `slds-dropdown-trigger--click` ([421a8f4](https://github.com/ng-lightning/ng-lightning/commit/421a8f4)), closes [#37](https://github.com/ng-lightning/ng-lightning/issues/37)
* **nglPick:** use `nglPick` instead of `selected` ([7549bb2](https://github.com/ng-lightning/ng-lightning/commit/7549bb2))
* **NglTabs:** prevent default window scrolling on arrow keys press ([7cda810](https://github.com/ng-lightning/ng-lightning/commit/7cda810)), closes [#43](https://github.com/ng-lightning/ng-lightning/issues/43)

### Features

* **app:** add breadcrumbs component ([ad11599](https://github.com/ng-lightning/ng-lightning/commit/ad11599)), closes [#24](https://github.com/ng-lightning/ng-lightning/issues/24) [#34](https://github.com/ng-lightning/ng-lightning/issues/34)
* **app:** add button group component ([69ee128](https://github.com/ng-lightning/ng-lightning/commit/69ee128))
* **app:** add section component ([ffaf227](https://github.com/ng-lightning/ng-lightning/commit/ffaf227))
* **NglPick:** support multiple selection ([fecb4ee](https://github.com/ng-lightning/ng-lightning/commit/fecb4ee)), closes [#42](https://github.com/ng-lightning/ng-lightning/issues/42) [#45](https://github.com/ng-lightning/ng-lightning/issues/45)
* **nglPopover:** add `theme` as input ([aafb713](https://github.com/ng-lightning/ng-lightning/commit/aafb713)), closes [#39](https://github.com/ng-lightning/ng-lightning/issues/39)



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
