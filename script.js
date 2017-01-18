var app = angular.module('493Search', []);

app.controller('searchResult',[ '$scope', '$http', function($scope, $http) {
  // your code goes here
  $scope.keyStroke = function( n, artistName ) {
  	var firstName, lastName;
  	if (n.which == "13")
  	{
  		if (artistName.indexOf(' ') >= 0)
  		{
  			firstName = artistName.slice(0, artistName.indexOf(' '));
  			lastName = artistName.slice(artistName.indexOf(' ') + 1);
  			$http({
  				method : "GET",
  				url : "https://api.spotify.com/v1/search?q=" + firstName + "+" + lastName + "&type=artist"
  			}).then(function success( d ) {
  				if (d.data.artists.items.length > 0)
  				{
  					$scope.resultList = d.data.artists.items;
  					console.log(d.data); //log only the data.data? or data?
  				}
  				else
  				{
  					alert("There are no search results for query: " + artistName);
  				}
  				
  			}, function error( d ) {
  				alert("THERE WAS AN ERROR !!)!)!(@#**#*");
  			});

  		}
  		else
  		{
  			$http({
  				method : "GET",
  				url : "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist"
  			}).then(function success( d ) {
  				if (d.data.artists.items.length > 0)
  				{
  					$scope.resultList = d.data.artists.items;
  					console.log(d.data); //log only the data.data? or data?
  				}
  				else
  				{
  					alert("There are no search results for query: " + artistName);
  				}
  				
  			}, function error( d ) {
  				alert("THERE WAS AN ERROR !!)!)!(@#**#*");
  			});
  		}
  	}
  };

  $scope.sliceString = function( start, end, name )
  {
  	return name.slice(start, end);
  };

}]);

app.controller('similarArtistsCtrl',['$scope', '$http', function($scope, $http) {
  // your code goes here
  $scope.clicked = false;

  $scope.similarArtist = function( n ) {
  	$scope.clicked = true;
  	$http({
		method : "GET",
		url : "https://api.spotify.com/v1/artists/"+ n + "/related-artists"
	}).then(function success( d ) {

		$scope.similarList = d.data.artists;
		console.log(d.data); //log only the data.data? or data?
		
	}, function error( d ) {
		alert("THERE WAS AN ERROR !!)!)!(@#**#*");
	});



  }

  $scope.sliceSimilar = function( start, end, name )
  {
  	return name.slice(start, end);
  }; 

}]);
