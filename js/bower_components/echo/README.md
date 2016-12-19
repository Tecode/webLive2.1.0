# Echo

**A configurable console wrapper.**

Author: [@gvn](http://twitter.com/gvn)


## Typical use case:

```javascript
// Configure what namespaces you want turned on
echo.namespaces = {
  contact: true,
  carousel: false
};

// This will display because the 'contact' namespace is enabled:
echo.warn('Invalid email', 'contact');

// This will not show up because carousel logs are turned off
echo('Slide changed', 'carousel');

// This will not show up because the namespace is undefined
// In production you can simply omit the `echo.namespaces` property to silence logs
echo('Oh hai', 'kitten');

// Namespace-free logs will always show up:
echo('Generic message');
```