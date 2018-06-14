# sky-count
> Count to infinity and beyond (well, close enough at least)

## Description
SkyCount is a simple component that takes any string containing numbers, such as `"1.234.000"` or `"23.5%"`, and animates a counter from 0 to the given value while retaining all non-digit characters. This enables you to easily append or prepend text and symbols to the counted number or control the way numbers are chunked (English style `"000,000.00"` vs German etc. `"000.000,00"`).

## Installation
```bash
npm install sky-count
```
or
```bash
yarn add sky-count
```

## Usage
Begin by importing and installing the SkyCount Vue plugin:
```js
import Vue from 'vue';
import SkyCount from 'sky-count';

Vue.use(SkyCount);

```
The `<sky-count>` component registers globally and can now be used. It's primary interface is the `trigger` prop, which it watches. When it is true, it counts upwards towards the value of the `to` prop (retaining its non-digit characters while animating).

Basic example:
``` html
<sky-count
    :trigger="myBooleanValue" // triggers the animation when true
    :to="'1,234,000 users'" // this is our target
/>
```

The number kan also be padded with zeros, so the string length is kept the same throughout the animation. This will make the animation look less "jittery" but might not always be what you're going for.
``` html
<sky-count
    :trigger="myBooleanValue"
    :to="'1,234,000 users'"
    :pad="true" // pad with zeros
/>
```

If you want to pad the number with something else than zeros you can do so like this:
``` html
<sky-count
    :trigger="myBooleanValue"
    :to="'1,234,000 users'"
    :pad="'-'" // we now pad with dashes instead
/>
```

If you want to start the animation from another value than zero this is also possible:
``` html
<sky-count
    :trigger="myBooleanValue"
    :to="'1,234,000 users'"
    :start="1000" // the animation starts at "1,000"
/>
```

The animation can also be customized:
``` html
<sky-count
    :trigger="myBooleanValue"
    :to="'1,234,000 users'"
    :delay="200" // 200ms
    :duration="500" // 500ms
    :ease="'easeInOutCubic'" // 'easeInOutSine', 'easeOutExpo', 'easeInQuad', 'linear' etc.
/>
```

Lastly, you can make the number continue slowly incrementing after the animation is done (A simple setInterval under the hood for now).
``` html
<sky-count
    :trigger="myBooleanValue"
    :to="'1,234,000 users'"
    :keepCounting="{ delay: 2000, add: 10 }" // when the animation is done the number is incremented by 10 every 2000ms
/>
```

# Credits
This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
