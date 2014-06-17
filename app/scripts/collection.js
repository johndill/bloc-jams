var buildAlbumThumbnail = function() {
  var template =
      '<div class="collection-album-container col-md-2">'
    + '  <img src="/images/album-placeholder.png"/>'
    + '  <div class="caption album-collection-info">'
    + '    <p>'
    + '      <a class="album-name" href="/album.html"> Album Name </a>'
    + '      <br/>'
    + '      <a href="/album.html"> Artist name </a>'
    + '      <br/>'
    + '      X songs'
    + '      <br/>'
    + '    </p>'
    + '  </div>'
    + '</div>';
  return $(template);
};

var updateCollectionView = function() {
  var $collection = $('.collection-container .row');
  $collection.empty();

  for (var i = 0; i < 33; i++) {
    var $newThumb = buildAlbumThumbnail();
    $collection.append($newThumb);
  }
};

if (document.URL.match(/\/collection.html/)) {
  // wait until html is fully loaded
  $(document).ready(function() {
    updateCollectionView();
  });
}