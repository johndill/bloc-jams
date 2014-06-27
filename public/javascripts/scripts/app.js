// Example albums
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picass',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21' },
    { name: 'Magenta', length: '2:15' }
  ]
};

angular.module('BlocJams', ['ui.router'])

  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state('landing', {
      url: '/',
      controller: 'Landing.controller',
      templateUrl: '/templates/landing.html'
    });

    $stateProvider.state('collection', {
      url: '/collection',
      controller: 'Collection.controller',
      templateUrl: '/templates/collection.html'
    });

    $stateProvider.state('album', {
      url: '/album',
      templateUrl: '/templates/album.html',
      controller: 'Album.controller'
    })
  }])

  .controller('Landing.controller', ['$scope', function($scope) {
    $scope.title = 'Bloc Jams';
    $scope.subText = 'Turn the music up!';
    $scope.bodyClass = 'landing';

    $scope.subTextClicked = function() {
      $scope.subText += '!';
    };

    $scope.albumURLs = [
      '/images/album-placeholders/album-1.jpg',
      '/images/album-placeholders/album-2.jpg',
      '/images/album-placeholders/album-3.jpg',
      '/images/album-placeholders/album-4.jpg',
      '/images/album-placeholders/album-5.jpg',
      '/images/album-placeholders/album-6.jpg',
      '/images/album-placeholders/album-7.jpg',
      '/images/album-placeholders/album-8.jpg',
      '/images/album-placeholders/album-9.jpg',
    ];

    $scope.shuffleAlbums = function() {
      $scope.albumURLs = shuffle($scope.albumURLs);
    };

    function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }
  }])

  .controller('Collection.controller', ['$scope', function($scope) {
    $scope.albums = [];
    $scope.bodyClass = 'collection'

    for (var i = 0; i < 33; i++) {
      $scope.albums.push(angular.copy(albumPicasso));
    }
  }])

  .controller('Album.controller', ['$scope', function($scope) {
    $scope.album = angular.copy(albumPicasso);

    var hoveredSong = null;
    var playingSong = null;

    $scope.onHoverSong = function(song) {
      hoveredSong = song;
    };

    $scope.offHoverSong = function(song) {
      hoveredSong = null;
    };

    $scope.getSongState = function(song) {
      if (song === playingSong) {
        return 'playing';
      }
      else if (song === hoveredSong) {
        return 'hovered';
      }
      else {
        return 'default';
      }
    };

    $scope.playSong = function(song) {
      playingSong = song;
    };

    $scope.pauseSong = function(song) {
      playingSong = null;
    };
  }]);