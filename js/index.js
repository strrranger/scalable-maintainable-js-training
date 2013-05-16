var app = app || {};
$(function(){
      $('#content').questions({onComplete: function(points){$("#content").result({points: points});}});
});
