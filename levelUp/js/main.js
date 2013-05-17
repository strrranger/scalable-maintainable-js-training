require.config({
    baseUrl: "js",
    paths: {
        jquery: 'lib/jquery-2.0.0.min',
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    }
});
require(["jquery", "underscore", "backbone", "app", "result", "questions" ], function($, _, BB, APP, Result, Questions){
    var content = $("#content");
    Result.init(content);
    Questions.init(content);
    APP.GO();
});