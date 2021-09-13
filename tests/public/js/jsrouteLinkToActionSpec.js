define( [ 'jsroute' ],function( Jsroute ) {

    describe( 'Jsroutes link_to_action method',function() {

        it( 'can generate an html link to a route',function() {
            expect( jsroute.link_to_action( 'HomeController@index' ) ).toBe( '<a href="/" >/</a>' );
        } );

        it( 'can generate a titled html link to a route',function() {
            expect( jsroute.link_to_action( 'HomeController@index','Home' ) ).toBe( '<a href="/" >Home</a>' );
        } );

        it( 'can generate a titled html link to a route with named parameters',function() {
            expect( jsroute.link_to_action( 'AwayController@somewhere','Away',{ somewhere: 'foo' } ) ).toBe( '<a href="/away/foo" >Away</a>' );
        } )

        it( 'can generate an html link to a route with attributes',function() {
            expect( jsroute.link_to_action( 'HomeController@index','Home',undefined,{ style: 'color:#bada55;' } ) ).toBe( '<a href="/" style="color:#bada55;">Home</a>' )
        } )

    } );

} );
