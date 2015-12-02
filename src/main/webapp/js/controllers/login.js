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
function LoginController($scope, $rootScope, $location, $http, LoginService) {
	
	$scope.login = function() {
		
		delete $rootScope.error;
		
		$http({
		    method: 'POST',
		    url: 'api/auth/v1/users/signin',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($scope.username+':'+$scope.password)},
			data: {'email':$scope.username}
		}).success(function(user) {
			
			if($rootScope.isAdmin(user)){
				$rootScope.username = $scope.username;
				$rootScope.password = $scope.password;
				$rootScope.user = user;
				$location.path("/admin/0");
			} else {
				$rootScope.error = "Not admin";
			}
			
		}).error(function(data, status) {
			$rootScope.error = "Bad credentials";
		    if (status === 400){
		    
		    } else if (status === 401) {
		    	//Unauthorized - Bad credentials
		    } else if (status === 409) {
		    	
		    } else {
		    	
		    }
		    $location.path("/login");
		});
	};
}
