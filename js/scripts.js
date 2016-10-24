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
          $('.showcase').append('<div class="video" id="'+ newVideo.videoRelevancy +'"><div class="video-title font1">' + newVideo.videoTitle + '</div><div class="' + newVideo.videoRelevancy + '-video-thumbnail"><img src="' + newVideo.videoThumbnail + '" class="video-thumbnail"/></div><div class="' + newVideo.videoRelevancy + '-video-overlay video-overlay"><div class="video-modal"><iframe width="95%" height="100%" src="https://www.youtube.com/embed/' + newVideo.videoId + '" frameborder="0" allowfullscreen></iframe></div><div><p class="' + newVideo.videoRelevancy + '-close-overlay close-overlay"></p></div></div></div>');
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

  $('.burger-icon').click(function() {
    $('.nav-drop').toggle();
  });

  var liPictures = [];

  $('.carousel-ol li').each(function(){
    liPictures.push(this);
  });

  $('.indicator-left').click(function() {
    for(i = 0; i < liPictures.length; i++){
      if ((i === 0) && ($(liPictures[i]).hasClass('active'))) {
        $(liPictures[i]).removeClass('active');
        $(liPictures[liPictures.length - 1]).addClass('active');
        break;
      }
      if ((i > 0) && ($(liPictures[i]).hasClass('active'))) {
        $(liPictures[i]).removeClass('active');
        $(liPictures[i - 1]).addClass('active');
        break;
      }
    }
  });


  $('.indicator-right').click(function() {
    for(i = 0; i < liPictures.length; i++){
      if ((i === liPictures.length - 1) && ($(liPictures[i]).hasClass('active'))) {
        $(liPictures[liPictures.length - 1]).removeClass('active');
        $(liPictures[0]).addClass('active');
        break;
      }
      if ((i < liPictures.length - 1) && ($(liPictures[i]).hasClass('active'))) {
        $(liPictures[i]).removeClass('active');
        $(liPictures[i + 1]).addClass('active');
        break;
      }
    }
  });



});
