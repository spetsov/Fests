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
                $scope.fests = $scope.fests.splice(index-1, 1);
                $scope.openEdit($scope.fests[0]);
        });;
    };
 
    $scope.reset();
    $scope.getFests();
};

function FestSongsController($scope, $http, $routeParams){
    var requestUrl = "/songs/" + $routeParams.festId + "/" + $routeParams.semiFinal;
    $scope.getSongs = function(){
        
        $http.get(requestUrl).success(function(songs){
            $scope.songs = songs;
            $scope.openEdit(songs[0]);
        });
    };
    
    $scope.openEdit = function(song){
        $scope.isNew = false;
        $scope.currentSong = song;
    };
    
    $scope.update = function(currentSong, isNew) {
        var master = angular.copy(currentSong);
       if(isNew){
           master.FestId = $routeParams.festId;
           if($routeParams.semiFinal === "f"){
               master.Final = true;
           }
           else{
               master.Semifinal = $routeParams.semiFinal;
           }
           
           $http.post("/songs", master).success(function(song){
               $scope.songs.push(song);
               $scope.isNew = false;
               $scope.currentSong = song;
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
                $scope.songs = $scope.songs.splice(index-1, 1);
                $scope.openEdit($scope.songs[0]);
        });
    };
    
    $scope.isSelected = function(song){
        return $scope.currentSong === song;
    }
 
    $scope.reset();
    $scope.getSongs();
    
};
