$(document).ready(function(){

  var channelName = 'TotallySeriousVideos';

  function Video( videoThumbnail, videoId, videoRelevancy){
    this.videoThumbnail = videoThumbnail;
    this.videoId = videoId;
    this.videoRelevancy = videoRelevancy;
  }

  $.get(
    "https://www.googleapis.com/youtube/v3/channels",{
        part: "contentDetails",
        forUsername: channelName,
        key: 'AIzaSyDUfkUIA_bCyw0TegKk-e3FnlUHhXWkrUE'
    },
    function(data){
      $.each(data.items, function(i, item) {
        pid = item.contentDetails.relatedPlaylists.uploads;
        getVids(pid);
      })
    }
  );

  function getVids(pid){
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",{
          part: "snippet",
          maxResults: 50,
          playlistId: pid,
          key: 'AIzaSyDUfkUIA_bCyw0TegKk-e3FnlUHhXWkrUE'
      },
      function(data){
        var output;
        $.each(data.items, function(i, item) {
          var newVideo = new Video(item.snippet.thumbnails.high.url, item.snippet.resourceId.videoId, item.snippet.position);
          $('.showcase').append('<div class="video" id="'+ newVideo.videoRelevancy +'"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + newVideo.videoId + '" frameborder="0" allowfullscreen></iframe></div>');
        });
      }
    );
  }
});
