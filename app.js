var app = angular.module("myapp", ['ngSanitize']);


app.controller("myCtrl", function($scope, $http) {
    $scope.searchvar = 0;
    $scope.carousalvar=0;
    $scope.visited=[];
    $scope.loading=1;
    $http.get("https://crossorigin.me/https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1").then(function(response) {
        console.log(response.data);
        $scope.loading=0;
        $scope.images = response.data.items;

    });
    $scope.search = function(query) {
    	$scope.loading=1;
        $scope.searchvar = 1;
        $http.get("https://crossorigin.me/https://api.flickr.com/services/feeds/photos_public.gne?tags="+query+"&format=json&nojsoncallback=1").then(function(response) {
            console.log(response.data);
            $scope.carimages = response.data.items;
            $scope.currimage= $scope.carimages[0];
            $scope.loading=0;
            $scope.carousalvar=1;
        });
        //$scope.$apply();
    }
    $scope.changeimage = function(event,src)
    {
    	$(".active").addClass("disabled");
    	$(event.target).removeClass('disabled');	
    	$(event.target).addClass('active');
    	$scope.currimage=src;
    }

});
