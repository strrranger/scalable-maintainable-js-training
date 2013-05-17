define('app', ["jquery"], function($){
    var eventBus = {};
    _.extend(eventBus, Backbone.Events);
    var Router = Backbone.Router.extend({
        routes: {
            "result/:points":       "result",
            "question/:index":      "question"
        },

        result : function(points) {
            eventBus.trigger("result:show", points);
        },

        question: function(index) {
            eventBus.trigger("questions:showQuestion", index);
        }

    });

    var router = new Router();
    return {
        EventBus: eventBus,
        Router: router,
        GO : function(){
            Backbone.history.start();
            router.navigate("question/0", {trigger:true});
        }
    }
});
