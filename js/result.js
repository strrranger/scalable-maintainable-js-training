;(function ( $, window, document, undefined ) {

    var pluginName = "result",
        defaults = {
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
        this._render();
    };

    Plugin.prototype._loadData = function(){
        /*var tempData = [];
         $.getJSON(this.options.jsonPath, function(data){
         tempData = data;
         });
         this.data = tempData;*///не работает локально
        this.data = [
            {
                "to": 16,
                "status": "Диплом бакалавра"
            },
            {
                "to": 23,
                "status": "Диплом магистра"
            },
            {
                "to": 30,
                "status": "Диплом доктора"
            }
        ];
    };

    Plugin.prototype._getStatus = function(){
        var status = '';
        var points = this.options.points;
        var maxPoints = 0;
        $.each(this.data, function(i, result){
            if(maxPoints < result.to && points >= result.to)
                status = result.status;
                maxPoints = result.to;
        });
        return status;
    };

    Plugin.prototype._render = function(){
        $(this.element).html('<b>Баллы:</b>&nbsp;'+this.options.points+'<br/><b>Результат:</b>&nbsp;' + this._getStatus());
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
