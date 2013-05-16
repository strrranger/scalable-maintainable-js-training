var APP = APP || {};
APP.bindEvents = function(){
    APP.EventBus.bind("questions:complete", function(points){APP.EventBus.trigger("result:show", points);},this);
};
APP.GO = function(){
    APP.bindEvents();
    var content = $("#content");
    APP.Result.init(content);
    APP.Questions.init(content);
};
$(APP.GO);
