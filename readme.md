# Jsroute

Fork of (aaronlord/jsroute)[https://github.com/aaronlord/jsroute/pull/95], which updates the seemingly dead package to the current version of Laravel.
It's recommended to use (https://github.com/tightenco/ziggy)[https://github.com/tightenco/ziggy] instead.

[Laravel](http://laravel.com/) has some pretty sweet [helper functions](http://laravel.com/docs/helpers#urls) for generating urls/links and its auto-json-magic makes it building APIs super easy. It's my go-to choice for building single-page js apps, but routing can quickly become a bit of a pain.

Wouldn't it be amazing if we could access our Laravel routes from JavaScript?

This package allows us to port our routes over to JavaScript, and gives us a bunch of _very familiar_ helper functions to use.

![Jsroute in action](jsroute.png)

## Installation

Install the usual [composer](https://getcomposer.org/) way.

###### composer.json
```json
{
	"require" : {
		"surgiollc/jsroute" : "2.*"
	}
}
```

###### app/config/app.php
```php
	...

	'providers' => array(
		...
		Surgio\Jsroute\JsrouteServiceProvider::class,
	],

	...
```

### Configure (optional)

Copy the packages config files.

```
php artisan vendor:publish --provider='Surgio\Jsroute\JsrouteServiceProvider'
```

###### app/config/jsroute.php

```php

return [

    /*
     * The destination path for the javascript file.
     */
    'path' => 'public/js',

    /*
     * The destination filename for the javascript file.
     */
    'filename' => 'jsroute',

    /*
     * The namespace for the helper functions. By default this will bind them to
     * `window.jsroute`.
     */
    'namespace' => 'jsroute',

    /*
     * Generate absolute URLs
     *
     * Set the Application URL in config/app.php
     */
    'absolute' => false,

    /*
     * The Filter Methode
     *
     * 'all' => All routes except "'jsroute' => false"
     * 'only' => Only "'jsroute' => true" routes
     * 'force' => All routes, ignored "jsroute" route parameter
     */
    'filter' => 'all',

    /*
     * Action Namespace
     *
     * Set here your controller namespace (see RouteServiceProvider -> $namespace) for cleaner action calls
     * e.g. 'App\Http\Controllers'
     */
    'action_namespace' => '',

    /*
     * The path to the template `jsroute.js` file. This is the file that contains
     * the ported helper Laravel url/route functions and the route data to go
     * with them.
     */
    'template' => 'vendor/surgiollc/jsroute/src/templates/jsroute.js',

    /*
     * Appends a prefix to URLs. By default the prefix is an empty string.
    *
    */
    'prefix' => '',

];


```

### Generate the `jsroute.js`

To access the routes, we need to "port" them over to a JavaScript file:

```
php artisan jsroute:generate
```

With the default configuration, this will create a `public/js/jsroute.js` file to include in your page, or build.

```html
<script src="/js/jsroute.js"></script>
```

**Note: You'll have to `jsroute:generate` if you change your routes.**

## JavaScript Documentation

By default, all of the functions are under the `jsroute` namespace. This documentation will stick with this convention.


### action

Generate a URL for a given controller action.

```js
/**
 * jsroute.action(action, [parameters = {}])
 *
 * action     : The action to route to.
 * parameters : Optional. key:value object literal of route parameters.
 */

jsroute.action('HomeController@getIndex');
```

### route

Generate a URL for a given named route.

```js
/**
 * jsroute.route(name, [parameters = {}])
 *
 * name       : The name of the route to route to.
 * parameters : Optional. key:value object literal of route parameters.
 */

 jsroute.route('Hello.{planet}', { planet : 'world' });
```

### url

Generate a fully qualified URL to the given path.

```js
/**
 * jsroute.url(name, [parameters = []])
 *
 * name       : The name of the route to route to.
 * parameters : Optional. value array of route parameters.
 */

 jsroute.url('foo/bar', ['aaa', 'bbb']); // -> /foo/bar/aaa/bbb
```

### link_to

Generate a html link to the given url.

```js
/**
 * jsroute.link_to(url, [title = url, attributes = {}]])
 *
 * url        : A relative url.
 * title      : Optional. The anchor text to display
 * attributes : Optional. key:value object literal of additional html attributes.
 */

 jsroute.link_to('foo/bar', 'Foo Bar', { style : "color:#bada55;" });
```

### link_to_route

Generate a html link to the given route.

```js
/**
 * jsroute.link_to_route(name, [title = url, parameters = {}], attributes = {}]]])
 *
 * name       : The name of the route to route to.
 * title      : Optional. The anchor text to display
 * parameters : Optional. key:value object literal of route parameters.
 * attributes : Optional. key:value object literal of additional html attributes.
 */

 jsroute.link_to_route('home', 'Home');
```

### link_to_action

Generate a html link to the given action.

```js
/**
 * jsroute.link_to_action(action, [title = url, parameters = {}], attributes = {}]]])
 *
 * action     : The action to route to.
 * title      : Optional. The anchor text to display
 * parameters : Optional. key:value object literal of route parameters.
 * attributes : Optional. key:value object literal of additional html attributes.
 */

 jsroute.link_to_action('HelloController@planet', undefined, { planet : 'world' });
```

## PHP Documentation

### Ignore/Filter Routes

By default, all routes are available to jsroute after a `php artisan jsroute:generate`. However, it is sometimes desirable to have jsroute ignore certain routes. You can do this by passing a `jsroute` route option.

```php
Route::get('/ignore-me', [
    'jsroute' => false,
    'as'      => 'ignoreme',
    'uses'    => 'IgnoreController@me'
]);

Route::group(['jsroute' => false], function () {
    Route::get('/groups-are-super-useful', 'GroupsController@index');
});

```


## Licence

[View the licence in this repo.](https://github.com/surgiollc/jsroute/blob/master/LICENSE)
