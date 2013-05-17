define('questions', ["jquery", "app"], function ($, APP) {
    var defaults = {
        jsonPath: "questions.json",
        questionTemplate: '<b></b><br/><ul><%=question%></ul>',
        answerTemplate: '<li><input type="radio" name="question" value="<%=points%>"><%=answer%></li>'
    };
    var Question = Backbone.Model.extend({
        question: "",
        answers: ["", "", ""],
        points: [0,0,0]
    });
    var Questions = Backbone.Collection.extend({model: Question});

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);
        this.questionIndex = 0;
        this.questionsData = null;
        this.questionsAnswers = null;
        this.questionTemplate = null;
        this.answerTemplate = null;
        this.points = 0;
        this.init();
    }

    Plugin.prototype.init = function () {
        this._loadData();
        this._bind();
    };

    Plugin.prototype._bind = function(){
        APP.EventBus.on("questions:showQuestion",this._showQuestion, this);
    };

    Plugin.prototype._showQuestion = function(index){
        this.questionIndex = index;
        var currentQuestion = this.questionsData.at(index);
        this._renderQuestion(currentQuestion.attributes);
        this._bindDomEvents();
    };

    Plugin.prototype._loadData = function () {
        var self = this;
        $.ajax({
            dataType: "json",
            async: false,
            url: this.options.jsonPath,
            success: function (data) {
                self.questionsData = new Questions(data);
                self.questionsAnswers = new Array(self.questionsData.length);
            }
        });
    };

    Plugin.prototype._getPoints = function(){
        var points = 0;
        var self = this;
        this.questionsData.forEach(function(question, index){
            points += question.points[self.questionsAnswers[index]];
        });
        return points;
    };

    Plugin.prototype._renderQuestion = function (question) {

        var div = $(this.element);
        if (this.questionTemplate === null)
            this.questionTemplate = _.template(this.options.questionTemplate);
        div.html(this.questionTemplate(question));
        var questionsUl = div.find('ul');
        this._renderAnswers(questionsUl, question);
    };

    Plugin.prototype._renderAnswers = function (ul, question) {
        var self = this;
        $.each(question.answers, function (i, value) {
            ul.append(self._renderAnswer({points:question.points[i], answer: value}));
        });
    };

    Plugin.prototype._renderAnswer = function (data) {
        if (this.answerTemplate === null)
            this.answerTemplate = _.template(this.options.answerTemplate);
        return $(this.answerTemplate(data));
    };

    Plugin.prototype._bindDomEvents = function () {
        var self = this;
        $('input').click(function () {
            self.questionsAnswers[self.questionIndex] = Number($(this).val());
            if(self.questionIndex + 1 < self.questionsData.length){
                var nextIndex = self.questionIndex++;
                APP.Router.navigate("question/" + nextIndex , {trigger:true});
            }
            else{
                APP.Router.navigate("result/" + this._getPoints(), {trigger:true});
            }
        });
    };

    return {
        init: function (element, options) {
            new Plugin(element, options);
        }

    };

});