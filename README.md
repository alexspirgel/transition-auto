# Transition Auto

Transition Auto is a JavaScript function enabling element width and height transitions to and from auto.

Notes:
* Resizing the element during the transition to auto can cause a "jump" to the new auto value at the end of the transition.
* The `options.innerElement` should not have styling that would cause it to differ in size from the `options.element`.
* To properly transition to a width of 'auto' make sure that the `options.innerElement` is not width limited by the `options.element`.

## Installation

### Using NPM:

```js
npm install @alexspirgel/transition-auto
```

```js
const Schema = require('@alexspirgel/transition-auto');
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
  overflow: hidden;
  transition-property: height; // and/or width
  transition-duration: 1s;
}
.inner {
  overflow: auto; // optional, prevents margin overflow
}
```

JS:
```js
transitionAuto({
  element: document.querySelector('.outer'),
  height: 'auto'
});
```

## Options

### `options.element`

Required. The element that will be transitioned.

### `options.innerElement`

Optional. The inner element that will wrap the content and dictate the the 'auto' sizing. If no element is passed, the first child of the `options.element` will be used.

### `options.width`

At least one `options.width` or `options.height` must be set. Can be a number (assumed pixels) or a string (any unit). THe value to transition the element to.

### `options.height`

At least one `options.width` or `options.height` must be set. Can be a number (assumed pixels) or a string (any unit). THe value to transition the element to.

### `options.debug`

Optional. Set to `true` to enable helpful console logs when debugging.