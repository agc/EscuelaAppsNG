// app.js attaches an angular instance to the window as a window.app object
// and defines module dependencies

//angular.module('ngFantasyFootball',['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngff.controllers',  'ngff.services']);

angular.module('ngFantasyFootball',[ 'ngRoute','ngff.controllers',  'ngff.services']);

angular.module('ngff.controllers',['ngff.controllers.header','ngff.controllers.nfl']);
angular.module('ngff.services', ['ngff.services.global','ngff.services.nfl']);

//window.app = angular.module('ngFantasyFootball', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngff.controllers', 'ngff.directives', 'ngff.services']);

// bundling dependencies


//window.angular.module('ngff.controllers', ['ngff.controllers.header','ngff.controllers.index','ngff.controllers.nfl','ngff.controllers.leagues','ngff.controllers.fantasyTeams','ngff.controllers.players','ngff.controllers.properties']);
//
//
// window.angular.module('ngff.services', ['ngff.services.global','ngff.services.nfl','ngff.services.leagues','ngff.services.fantasyTeams','ngff.services.players','ngff.services.properties']);