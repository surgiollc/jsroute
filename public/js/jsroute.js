( function() { var e = function() { var e = { routes: [ { "host": null,"methods": [ "GET","HEAD" ],"uri": "hello","name": null,"action": "Closure" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "\/","name": "home","action": "HomeController@index" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "away\/{somewhere}","name": "away","action": "AwayController@somewhere" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "away\/{somewhere}\/very\/{exotic}","name": "exotic","action": "AwayController@exotic" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "group\/{group}","name": null,"action": "GroupController@index" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "group\/{group}\/resource\/{resource}","name": "group.{group}.resource.{resource}.index","action": "GroupResourceController@index" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "group\/{group}\/resource\/{resource}\/create","name": "group.{group}.resource.{resource}.create","action": "GroupResourceController@create" },{ "host": null,"methods": [ "POST" ],"uri": "group\/{group}\/resource\/{resource}","name": "group.{group}.resource.{resource}.store","action": "GroupResourceController@store" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "group\/{group}\/resource\/{resource}\/{{resource}}","name": "group.{group}.resource.{resource}.show","action": "GroupResourceController@show" },{ "host": null,"methods": [ "GET","HEAD" ],"uri": "group\/{group}\/resource\/{resource}\/{{resource}}\/edit","name": "group.{group}.resource.{resource}.edit","action": "GroupResourceController@edit" },{ "host": null,"methods": [ "PUT" ],"uri": "group\/{group}\/resource\/{resource}\/{{resource}}","name": "group.{group}.resource.{resource}.update","action": "GroupResourceController@update" },{ "host": null,"methods": [ "PATCH" ],"uri": "group\/{group}\/resource\/{resource}\/{{resource}}","name": null,"action": "GroupResourceController@update" },{ "host": null,"methods": [ "DELETE" ],"uri": "group\/{group}\/resource\/{resource}\/{{resource}}","name": "group.{group}.resource.{resource}.destroy","action": "GroupResourceController@destroy" } ],route: function( e,t,n ) { n = n || this.getByName( e ); if ( !n ) { return undefined } return this.toRoute( n,t ) },toRoute: function( e,t ) { uri = this.replaceNamedParameters( e.uri,t ); qs = this.getRouteQueryString( t ); return "/" + uri.replace( /^\/?/,"" ) + qs },replaceNamedParameters: function( e,t ) { return e.replace( /\{(.*?)\??\}/g,function( e,n ) { if ( t.hasOwnProperty( n ) ) { value = t[ n ]; delete t[ n ]; return value } } ) },getRouteQueryString: function( e ) { qs = []; for ( var t in e ) { if ( e.hasOwnProperty( t ) ) { qs.push( t + "=" + e[ t ] ) } } if ( qs.length < 1 ) { return "" } return "?" + qs.join( "&" ) },getByName: function( e ) { for ( var t in this.routes ) { if ( this.routes.hasOwnProperty( t ) && this.routes[ t ].name === e ) { return this.routes[ t ] } } },getByAction: function( e ) { for ( var t in this.routes ) { if ( this.routes.hasOwnProperty( t ) && this.routes[ t ].action === e ) { return this.routes[ t ] } } } }; return { action: function( t,n ) { n = n || {}; return e.route( t,n,e.getByAction( t ) ) },route: function( t,n ) { n = n || {}; return e.route( t,n ) },link_to: function( e,t,n ) { e = "/" + e.replace( /^\/?/,"" ); t = t || e; n = this.getLinkAttributes( n ); return '<a href="' + e + '" ' + n + ">" + t + "</a>" },link_to_route: function( e,t,n,r ) { uri = this.route( e,n ); t = t || uri; n = n || {}; r = r || {}; return this.link_to( uri,t,r ) },link_to_action: function( e,t,n,r ) { uri = this.action( e,n ); t = t || uri; n = n || {}; r = r || {}; return this.link_to( uri,t,r ) },getLinkAttributes: function( e ) { if ( !e ) { return "" } attrs = []; for ( var t in e ) { if ( e.hasOwnProperty( t ) ) { attrs.push( t + '="' + e[ t ] + '"' ) } } return attrs.join( " " ) } } }.call( this ); window.jsroute = e } ).call( this )