//===Search for photos===//

$(function() {
  var $loader = $('.ajax-loader');
  var nextUrl;
  var $loadMore = $('.load-button');
  var $results = $('.photogrid');
  var info = '';

$('#search').on('click', function(event) {
    event.preventDefault();

    $loader.css('display', 'block');
    $loadMore.hide();

  var hashtag= $('input[id="hashtag"]').val();

$("header").addClass("populatedheader");

  $.ajax({
    dataType: 'jsonp',
    method: 'GET',
    url:"https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682"
  }).done(function(photoData) {
      $.each(photoData.data, function(index, value) {

    info += '<li>';
    info += '<div class="mainimage">';
    info += '<a href=" '+ value.link + ' "> <img src="' +  value.images.standard_resolution.url +'"></a>';
    info += '<div class="imageinfo">';
    info += '<div class = "profilepic"><img src="' + value.user.profile_picture + '"/>';
    info += '</div>';
    info +='<div class="profileinfo">';
    info += '<p>' + value.user.username + '</p>';
    info += '<p>' + '<i class="fa fa-comments"></i>' + value.comments.count + '<i class="fa fa-heart"></i>' + value.likes.count + '</p>';
    info += '</div>';
    info += '</div>';
    info += '</div>';
    info += '</li>';
  });

    $results.empty().append(info);
    info = '';

    $loadMore.fadeIn('slow').css('display', 'block');
    nextUrl = photoData.pagination.next_url;
})

  .fail(function() {
    $results.append('<li>An error occurred.</li>');
    info = '';
  })

  .always(function(){
    $loader.hide();
  });
});

//===Load More Button===//

$('.load-button').on('click', function(event) {
  event.preventDefault();

   $.ajax({
     dataType: 'jsonp',
     method: 'GET',
     url: nextUrl,
   })

   .done(function(photoData) {
     nextUrl = photoData.pagination.next_url;
       $.each(photoData.data, function(index, value) {

     info += '<li>';
     info += '<div class="mainimage">';
     info += '<a href=" '+ value.link + ' "> <img src="' +  value.images.standard_resolution.url +'"></a>';
     info += '<div class="imageinfo">';
     info += '<div class = "profilepic"><img src="' + value.user.profile_picture + '"/>';
     info += '</div>';
     info +='<div class=profileinfo>';
     info += '<p>' + value.user.username + '</p>';
     info += '<p>' + '<i class="fa fa-comments"></i>' + value.comments.count + '<i class="fa fa-heart"></i>' + value.likes.count + '</p>';
     info += '</div>';
     info += '</div>';
     info += '</div>';
     info += '</li>';
   });

     $results.append(info);
     info = '';

     $loadMore.fadeIn('slow').css('display', 'block');
 })

   .fail(function() {
     $results.append('<li>An error occurred.</li>');
     info = '';
   })

   .always(function() {
     $loader.hide();
   });

 });
});
