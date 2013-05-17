define('result', ["jquery", "app"], function ($, APP) {
    var defaults = {
        jsonPath: "results.json",
        points: 0
    };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        this.data = [];
        this.init();
    }

    Plugin.prototype.init = function () {
        this._loadData();
        this._bind();
    };

    Plugin.prototype._bind = function(){
        APP.EventBus.on("result:show", this._render, this);
    };

    Plugin.prototype._loadData = function(){
        var self = this;
        $.ajax({
            dataType: "json",
            async: false,
            url: this.options.jsonPath,
            success: function (data) {
                self.data = data;
            }
        });
    };

    Plugin.prototype._getStatus = function(points){
        var status = '';
        var minPoints = 100;
        $.each(this.data, function(i, result){
            if(minPoints > result.to && points <= result.to){
                status = result.status;
                minPoints = result.to;
            }
        });
        return status;
    };

    Plugin.prototype._render = function(points){
        $(this.element).html('<b>Баллы:</b>&nbsp;'+points+'<br/><b>Результат:</b>&nbsp;' + this._getStatus(points));
    };

    return {
        init: function (element, options){
            new Plugin( element, options);
        }
    };
});
