/*******************************************************************************
 * Copyright 2015 MobileMan GmbH
 * www.mobileman.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
angular.module('momentsApp', ['ngRoute', 'ngGrid', 'ibogaApp.services'])
	.config(
		[ '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

			$routeProvider.when('/edit/:id', {
				templateUrl: 'views/edit.html',
				controller: null
			});

			$routeProvider.when('/login', {
				templateUrl: 'views/login.html',
				controller: LoginController
			});

			$routeProvider.when('/admin', {
				templateUrl : 'views/admin.html',
				controller : AdminController
			});
			
			$routeProvider.when('/admin/:id', {
				templateUrl : 'views/admin.html',
				controller : AdminController
			});
			
			$routeProvider.otherwise({
				redirectTo : '/login'
			});

			//$locationProvider.hashPrefix('!');

			/* Intercept http errors */
			/*
			var interceptor = function ($rootScope, $q, $location) {

		        function success(response) {
		            return response;
		        }

		        function error(response) {

		            var status = response.status;
		            var config = response.config;
		            var method = config.method;
		            var url = config.url;

		            if (status == 401) {
		            	$location.path( "/login" );
		            } else {
		            	$rootScope.error = method + " on " + url + " failed with status " + status;
		            }

		            return $q.reject(response);
		        }

		        return function (promise) {
		            return promise.then(success, error);
		        };
		    };
		    $httpProvider.responseInterceptors.push(interceptor);
*/
		} ]

	).run(function($rootScope, $http, $location, LoginService) {

		/* Reset error when a new view is loaded */
		$rootScope.$on('$viewContentLoaded', function() {
			delete $rootScope.error;
		});

		$rootScope.isAdmin = function(user) {
			if (user.account.role == 2) {
				return true;
			}
			
			return false;
		}
		
		$rootScope.logout = function() {
			delete $rootScope.user;
			$location.path("/login");
		};

		//start
		var originalPath = $location.path();
		$location.path("/login");

	});

var services = angular.module('momentsApp.services', ['ngResource']);

services.factory('LoginService', function($resource) {

	return $resource(':action', {},
			{
				authenticate: {
					method: 'POST',
					params: {'action' : 'authenticate'},
					headers : {'Content-Type': 'application/json'}
				}
			}
		);
});

services.factory('ReportService', function($resource) {

	//return $resource('news/:id', {id: '@id'});
	
	return 
	
});
