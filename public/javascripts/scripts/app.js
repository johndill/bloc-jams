// Example albums
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picass',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue' },
    { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
    { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
    { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink' },
    { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta' }
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

  .controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.albums = [];
    $scope.bodyClass = 'collection'

    for (var i = 0; i < 33; i++) {
      $scope.albums.push(angular.copy(albumPicasso));
    }

    $scope.playAlbum = function(album) {
      SongPlayer.setSong(album, album.songs[0]);
    };
  }])

  .controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.album = angular.copy(albumPicasso);

    var hoveredSong = null;

    $scope.onHoverSong = function(song) {
      hoveredSong = song;
    };

    $scope.offHoverSong = function(song) {
      hoveredSong = null;
    };

    $scope.getSongState = function(song) {
      if (song === SongPlayer.currentSong && SongPlayer.playing) {
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
      SongPlayer.setSong($scope.album, song);
    };

    $scope.pauseSong = function(song) {
      SongPlayer.pause();
    };
  }])

  .controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.songPlayer = SongPlayer;
  }])

  .service('SongPlayer', function() {
    var currentSoundFile = null;

    var trackIndex = function(album, song) {
      return album.songs.indexOf(song);
    };

    return {
      currentSong: null,
      currentAlbum: null,
      playing: false,


      play: function() {
        this.playing = true;
        currentSoundFile.play();
      },

      pause: function() {
        this.playing = false;
        currentSoundFile.pause();
      },

      next: function() {
        var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
        currentTrackIndex++;
        if (currentTrackIndex >= this.currentAlbum.songs.length) {
          currentTrackIndex = 0;
        }
        this.currentSong = this.currentAlbum.songs[currentTrackIndex];
        this.setSong(this.currentAlbum, this.currentSong);
      },

      previous: function() {
        var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
          currentTrackIndex = this.currentAlbum.songs.length - 1;
        }
        this.currentSong = this.currentAlbum.songs[currentTrackIndex];
        this.setSong(this.currentAlbum, this.currentSong);
      },

      setSong: function(album, song) {
        if (currentSoundFile) {
          currentSoundFile.stop();
        }

        this.currentAlbum = album;
        this.currentSong = song;

        currentSoundFile = new buzz.sound(song.audioUrl, {
          formats: [ 'mp3' ],
          preload: true
        });

        this.play();
      }
    };
  });