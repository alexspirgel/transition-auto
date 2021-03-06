# Transition Auto

Transition Auto is a JavaScript function enabling element width and height transitions to and from auto.

<a href="http://alexanderspirgel.com/transition-auto/demo" target="_blank">View the demo →</a>

Notes:
* Resizing the element during the transition to auto can cause a "jump" to the new auto value at the end of the transition.
* The `innerElement` should not have styling that would cause it to differ in size from the `element`.
* To properly transition to a `width` of 'auto' make sure that the `innerElement` is not width limited by the `element`.

## Installation

### Using NPM:

```js
npm install @alexspirgel/transition-auto
```

```js
const transitionAuto = require('@alexspirgel/transition-auto');
```

### Using a script tag:

Download the normal or minified script from the `/dist` folder.

```html
<script src="path/to/transition-auto.js"></script>
```

## Usage

HTML:
```html
<div class="outer">
  <div class="inner">
    content...
  </div>
</div>
```

CSS:
```css
.outer {
  /* Prevent the content from overflowing the parent. */
  overflow: hidden;
  /* Add transition */
  transition-property: height; /* and/or width */
  transition-duration: 1s;
}
.inner {
  /* Margins will cause incorrect dimension calculations. */
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  /* Force element account for children margins in dimensions. */
  overflow: auto;
}
```

JS:
```js
transitionAuto({
  element: document.querySelector('.outer'),
  property: 'height',
  value: 'auto'
});
```

## Options

### `element`

The element that will be transitioned. The passed value must be an element reference. Required.

### `innerElement`

The inner element that wraps the content and dictates the 'auto' sizing. The passed value must be an element reference. Optional. If no value is passed, the first child of the `element` option value will be used.

### `property`

The property to transition. Can be 'height' or 'width'. Required.

### `value`

The value to set the `property` to. Can be a number (pixels) or a pixel string (ending in 'px'). Required.

### `onComplete`

A callback that triggers when the `element` has reached the desired height/width. This will wait for the transition to complete, but could be instant if no transition is present. The callback will pass the options object as a parameter. Note: if the transition of the element is interrupted by another call of `transitionAuto` on the same element, this callback will not trigger for the original call because the original transition never completed.

### `suppressDuplicates`

When `true`, calls of `transitionAuto` on an element currently transitioning to the desired value will be ignored. Defaults to `true`. Set to `false` to disable this feature.

### `debug`

Set to `true` to enable helpful console logs when debugging. Defaults to `false`.