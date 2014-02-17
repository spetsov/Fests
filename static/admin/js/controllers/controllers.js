function FestController($scope, $http){
 
    $scope.getFests = function(){
        $http.get("/fests").success(function(fests){
            $scope.fests = fests;
            $scope.currentFest = fests[0];
        });
    };
    
    $scope.openEdit = function(fest){
        $scope.isNew = false;
        $scope.currentFest = fest;
    }
    
    $scope.update = function(currentFest, isNew) {
       var master = angular.copy(currentFest);
       if(isNew){
           $http.post("/fests", master).success(function(fest){
               $scope.fests.push(fest);
               $scope.isNew = false;
               $scope.currentFest = fest;
           });
       }
       else{
           $http.put("/fests/" + currentFest._id, master);
       }
    };
    
    $scope.addFest = function(){
        $scope.isNew = true;
        $scope.reset();
    };
 
    $scope.reset = function() {
       $scope.currentFest = {};
    };
    
    $scope.delete = function(festId){
        $http.delete("/fests/" + festId).success(function(err){
                var index = $scope.fests.indexOf($scope.currentFest);
                $scope.fests.splice(index, 1);
                $scope.openEdit($scope.fests[0]);
        });;
    };
 
    $scope.reset();
    $scope.getFests();
};

function FestSongsController($scope, $http, $routeParams){
    var requestUrl = "/songs/" + $routeParams.festId + "/" + $routeParams.semiFinal;
    var countriesUrl = "/countries"

    $scope.getSongs = function(){
        
        $http.get(requestUrl).success(function(songs){
            $scope.songs = songs;
            $scope.openEdit(songs[0]);
        });
    };

    $scope.getCountries = function(){
        
        $http.get(countriesUrl).success(function(countries){
            $scope.countries = countries;
        });
    };
    
    $scope.openEdit = function(song){
        $scope.isNew = false;
        $scope.currentSong = song;
    };
    
    $scope.update = function(currentSong, isNew) {
        var master = angular.copy(currentSong);
        
        master.Country = currentSong.Country._id;
       if(isNew){
           master.FestId = $routeParams.festId;
           if($routeParams.semiFinal === "f"){
               master.Final = true;
           }
           else{
               master.Semifinal = $routeParams.semiFinal;
           }
           
           $http.post("/songs", master)
           .success(function(songs){
               $scope.songs.push(songs[0]);
               $scope.isNew = false;
               $scope.currentSong = angular.copy(songs[0]);
               
           });
       }
       else{
           
           $http.put("/songs/" + currentSong._id, master);
       }
    };
    
    $scope.addSong = function(){
        $scope.isNew = true;
        $scope.reset();
    };
 
    $scope.reset = function() {
       $scope.currentSong = {};
    };
    
    $scope.delete = function(songId){
        $http.delete("/songs/" + songId).success(function(err){
                var index = $scope.songs.indexOf($scope.currentSong);
                $scope.songs.splice(index, 1);
                $scope.openEdit($scope.songs[0]);
        });
    };
    
    $scope.isSelected = function(song){
        return $scope.currentSong === song;
    }
 
    $scope.reset();
    $scope.getSongs();
    $scope.getCountries();
    
};

function CountriesController($scope, $http){
 
    $scope.getCountries = function(){
        $http.get("/countries").success(function(countries){
            $scope.countries = countries;
            $scope.currentCountry = countries[0];
        });
    };
    
    $scope.openEdit = function(country){
        $scope.isNew = false;
        $scope.currentCountry = country;
    }
    
    $scope.update = function(currentCountry, isNew) {
       var master = angular.copy(currentCountry);
       if(isNew){
           $http.post("/countries", master).success(function(country){
               $scope.countries.push(country);
               $scope.isNew = false;
               $scope.currentCountry = country;
           });
       }
       else{
           $http.put("/countries/" + currentCountry._id, master);
       }
    };
    
    $scope.addCountry = function(){
        $scope.isNew = true;
        $scope.reset();
    };
 
    $scope.reset = function() {
       $scope.currentCountry = {};
    };
    
    $scope.delete = function(countryId){
        $http.delete("/countries/" + countryId).success(function(err){
                var index = $scope.countries.indexOf($scope.currentCountry);
                $scope.countries.splice(index, 1);
                $scope.openEdit($scope.countries[0]);
        });;
    };
 
    $scope.reset();
    $scope.getCountries();
};
