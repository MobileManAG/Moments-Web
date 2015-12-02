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
function AdminController($scope, $rootScope, ReportService, $routeParams, $location, $http, $q) {
	
	$scope.filter = 0;
	$scope.page = 1;
	$scope.pageSize = 250;
	
	if ($rootScope.user === undefined) {
		$location.path("/login");
	}
		
	$scope.getData = function() {
		$http({
		    method: 'GET',
		    url: 'api/auth/v1/reports?filter=' + $scope.filter,
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		}).success(function(data) {
			
			console.log("ok");
			$scope.setPagingData(data.content, $scope.page, $scope.pageSize);
			
		}).error(function(data, status) {
			
			console.log("error");
			
		});
	}
	
	$scope.deleteReport = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId,
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}

	$scope.deleteQuestion = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId+'/question',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}
	
	$scope.deleteInsight = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId+'/insight',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}
	
	$scope.deleteReportAuthor = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId+'/report_author',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}

	$scope.deleteQuestionAuthor = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId+'/question_author',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}
	
	$scope.deleteInsightAuthor = function(reportId) {
		$http({
		    method: 'DELETE',
		    url: 'api/auth/v1/reports/'+reportId+'/insight_author',
		    headers : {'Content-Type': 'application/json', 'Authorization':'Basic ' + btoa($rootScope.username+':'+$rootScope.password)},
		    data: {}
		}).success(function(result) {
			
			console.log("ok");
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			
		}).error(function(result, status) {
			
			console.log("error");
			
		});
	}
	
	$scope.tabs = [ {
		name : 'Reports',
		columns : 'columnReport',
		filter: '0'
	}, {
		name : 'Deleted questions',
		columns : 'columnQuestion',
		filter: '1'
	}, {
		name : 'Deleted insights',
		columns : 'columnInsight',
		filter: '2'
	}, {
		name : 'Deleted users',
		columns : 'columnUser',
		filter: '6'
	}];
	
	$scope.tab = 0;
	if ($routeParams.id) {
		$scope.tab = parseInt($routeParams.id);
	}
	
	$scope.switchTab = function(index) {
		$scope.tab = index;
		$location.path("/admin/"+$scope.tab);
	}
	
	var createdOnCellTemplate = '<div>{{row.getProperty(col.field)| date:"dd.MM.yyyy"}}</div><div></div>';
	var createdOnWithDeleteCellTemplate = '<div>{{row.getProperty(col.field)| date:"dd.MM.yyyy"}}</div><div><button class="btn btn-info btn-xs" ng-click="deleteReport(row.entity[\'id\'])" >Delete</button></div>';
	var questionCellTemplate = '<div ng-class="{redBoldText: row.getProperty(\'entityType\') === 2}">{{row.getProperty(col.field)}}</div><div><button ng-hide="{{row.entity[\'questionDeleted\']}}" class="btn btn-danger btn-xs" ng-click="deleteQuestion(row.entity[\'id\'])" >Delete</button><button ng-disabled="true" ng-show="{{row.entity[\'questionDeleted\']}}" class="btn btn-default btn-xs" >Deleted</button></div>';
	var insightCellTemplate = '<div ng-class="{redBoldText: row.getProperty(\'entityType\') === 1}">{{row.getProperty(col.field)}}</div><div ng-class="{hidden: row.getProperty(\'entityType\') === 2}"><button ng-hide="{{row.entity[\'insightDeleted\']}}" class="btn btn-danger btn-xs" ng-click="deleteInsight(row.entity[\'id\'])" >Delete</button><button ng-disabled="true" ng-show="{{row.entity[\'insightDeleted\']}}" class="btn btn-default btn-xs" >Deleted</button></div>';
	var questionByCellTemplate = '<div>{{row.getProperty(col.field)}}</div><div><button ng-hide="{{row.entity[\'questionAuthorDeleted\']}}" class="btn btn-danger btn-xs" ng-click="deleteQuestionAuthor(row.entity[\'id\'])" >Delete</button><button ng-disabled="true" ng-show="{{row.entity[\'questionAuthorDeleted\']}}" class="btn btn-default btn-xs" >Deleted</button></div>';
	var insightByCellTemplate = '<div>{{row.getProperty(col.field)}}</div><div  ng-class="{hidden: row.getProperty(\'entityType\') === 2}"><button ng-hide="{{row.entity[\'insightAuthorDeleted\']}}"class="btn btn-danger btn-xs" ng-click="deleteInsightAuthor(row.entity[\'id\'])" ng-show="{{row.getProperty(\'entityType\')}} === 1" >Delete</button><button ng-disabled="true" ng-show="{{row.entity[\'insightAuthorDeleted\']}}" class="btn btn-default btn-xs" >Deleted</button></div>';
	var reportByCellTemplate = '<div>{{row.getProperty(col.field)}}</div><div><button ng-hide="{{row.entity[\'reportAuthorDeleted\']}}" class="btn btn-danger btn-xs" ng-click="deleteReportAuthor(row.entity[\'id\'])" >Delete</button><button ng-disabled="true" ng-show="{{row.entity[\'reportAuthorDeleted\']}}" class="btn btn-default btn-xs" >Deleted</button></div>';
	
	$scope.columnReport = {
			cols : [
                    {
                    	field: 'createdOn', 
                    	displayName: 'Report date', 
                    	cellTemplate: createdOnWithDeleteCellTemplate
                    }, 
                    {
                    	field: 'question.tag.name', 
                    	displayName:'Interest'}, 
                    {
                    	field: 'question.text', 
                    	displayName:'Question', 
                    	cellTemplate: questionCellTemplate
                    },
                    {
                    	field: 'insight.text', 
                    	displayName:'Insight', 
                    	cellTemplate: insightCellTemplate,
                    	
                    },
                    {
                    	field: 'question.createdBy.userName', 
                    	displayName:'Question by', 
                    	cellTemplate: questionByCellTemplate
                    },
                    {
                    	field: 'insight.createdBy.userName', 
                    	displayName:'Insight by', 
                    	cellTemplate: insightByCellTemplate
                    },
                    {
                    	field: 'createdBy.userName', 
                    	displayName:'Report by', 
                    	cellTemplate: reportByCellTemplate
                    },
                    ]
		};
	
	$scope.columnQuestion = {
			cols : [
                    {
                    	field: 'createdOn', 
                    	displayName: 'Report date', 
                    	cellTemplate: createdOnCellTemplate
                    }, 
                    {
                    	field: 'question.tag.name', 
                    	displayName:'Interest'}, 
                    {
                    	field: 'question.text', 
                    	displayName:'Question', 
                    	cellTemplate: questionCellTemplate
                    },
                    {
                    	field: 'insight.text', 
                    	displayName:'Insight', 
                    	cellTemplate: insightCellTemplate,
                    	
                    },
                    {
                    	field: 'question.createdBy.userName', 
                    	displayName:'Question by', 
                    	cellTemplate: questionByCellTemplate
                    },
                    {
                    	field: 'insight.createdBy.userName', 
                    	displayName:'Insight by', 
                    	cellTemplate: insightByCellTemplate
                    },
                    {
                    	field: 'createdBy.userName', 
                    	displayName:'Report by', 
                    	cellTemplate: reportByCellTemplate
                    },
                    ]
		};
	
	$scope.columnInsight = {
			cols : [
                    {
                    	field: 'createdOn', 
                    	displayName: 'Report date', 
                    	cellTemplate: createdOnCellTemplate
                    }, 
                    {
                    	field: 'question.tag.name', 
                    	displayName:'Interest'}, 
                    {
                    	field: 'question.text', 
                    	displayName:'Question', 
                    	cellTemplate: questionCellTemplate
                    },
                    {
                    	field: 'insight.text', 
                    	displayName:'Insight', 
                    	cellTemplate: insightCellTemplate,
                    	
                    },
                    {
                    	field: 'question.createdBy.userName', 
                    	displayName:'Question by', 
                    	cellTemplate: questionByCellTemplate
                    },
                    {
                    	field: 'insight.createdBy.userName', 
                    	displayName:'Insight by', 
                    	cellTemplate: insightByCellTemplate
                    },
                    {
                    	field: 'createdBy.userName', 
                    	displayName:'Report by', 
                    	cellTemplate: reportByCellTemplate
                    },
                    ]
		};
	
	$scope.columnUser = {
			cols : [
                    {
                    	field: 'createdOn', 
                    	displayName: 'Report date', 
                    	cellTemplate: createdOnCellTemplate
                    }, 
                    {
                    	field: 'question.tag.name', 
                    	displayName:'Interest'}, 
                    {
                    	field: 'question.text', 
                    	displayName:'Question', 
                    	cellTemplate: questionCellTemplate
                    },
                    {
                    	field: 'insight.text', 
                    	displayName:'Insight', 
                    	cellTemplate: insightCellTemplate,
                    	
                    },
                    {
                    	field: 'question.createdBy.userName', 
                    	displayName:'Question by', 
                    	cellTemplate: questionByCellTemplate
                    },
                    {
                    	field: 'insight.createdBy.userName', 
                    	displayName:'Insight by', 
                    	cellTemplate: insightByCellTemplate
                    },
                    {
                    	field: 'createdBy.userName', 
                    	displayName:'Report by', 
                    	cellTemplate: reportByCellTemplate
                    },
                    ]
		};
	
	$scope.columnDefs = $scope.columnDefsReport;
	
	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
	
    $scope.totalServerItems = 0;
    
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };	
    
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        
        $scope.columnDefs = angular.copy($scope[$scope.tabs[$scope.tab].columns], {});
        
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    	var filter = $scope.tabs[$scope.tab].filter;
    	if (filter) {
    		$scope.filter = filter;
    		$scope.page = page;
    		$scope.pageSize = pageSize;
    		$scope.getData();
		}
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        /*
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        multiSelect: false,
        */
        enableSorting: false,
        enableRowSelection: false,
        columnDefs: 'columnDefs.cols'
    };
    
    $scope.columnDefs = angular.copy($scope[$scope.tabs[$scope.tab].columns], {});

}
