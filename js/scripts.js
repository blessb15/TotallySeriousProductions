$(document).ready(function(){
  var channelName = 'TotallySeriousVideos';
  var videoArray = [];


  function Video( videoThumbnail, videoId, videoRelevancy, videoTitle){
    this.videoThumbnail = videoThumbnail;
    this.videoId = videoId;
    this.videoRelevancy = videoRelevancy;
    this.videoTitle = videoTitle;
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
          var newVideo = new Video(item.snippet.thumbnails.high.url, item.snippet.resourceId.videoId, item.snippet.position, item.snippet.title);
          videoArray.push(newVideo);
          $('.showcase').append('<div class="video" id="'+ newVideo.videoRelevancy +'"><div class="video-title font1">' + newVideo.videoTitle + '</div><div class="' + newVideo.videoRelevancy + '-video-thumbnail"><img src="' + newVideo.videoThumbnail + '" class="video-thumbnail"/></div><div class="' + newVideo.videoRelevancy + '-video-overlay video-overlay"><div class=" video-modal"><iframe width="950" height="500" src="https://www.youtube.com/embed/' + newVideo.videoId + '" frameborder="0" allowfullscreen></iframe></div><div><p class="' + newVideo.videoRelevancy + '-close-overlay close-overlay"></p></div></div></div>');
          $('.' + newVideo.videoRelevancy + '-video-overlay').hide();

          $('#' + newVideo.videoRelevancy + '').click(function() {
            $('.' + newVideo.videoRelevancy + '-video-overlay').toggle();
          });

          $('.' + newVideo.videoRelevancy + '-close-overlay').click(function() {
            $('.' + newVideo.videoRelevancy + '-video-overlay').toggle();
          });
        });
      }
    );
  }

  $(window).scroll(function(){
    if($(window).scrollTop() < $('.welcome').height()) {
      $('.nav-bar').addClass('opac-bar');
      $('.nav-drop').addClass('opac-bar');
      $('.tsp-logo').removeClass('tsp-solid');
    }
    if($(window).scrollTop() >= $('.welcome').height()) {
      $('.nav-bar').removeClass('opac-bar');
      $('.nav-drop').removeClass('opac-bar');
      $('.tsp-logo').addClass('tsp-solid');
    }
  });

  $('.burger-icon').click(function() {
    $('.nav-drop').toggle();
  });

  $('.enter-button-inline').click(function(){
    $('.head-pic').fadeIn(3000);
    $('.index-contain').show();
    $('.footer').show();
    $('.enter-button-div').hide();
  });
});
