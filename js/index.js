var app = app || {};
$(function(){
      $('#content').questions({onComplete: function(points){$("#content").html(points);/*$("#content").questionResult({points: points});*/}});
});
