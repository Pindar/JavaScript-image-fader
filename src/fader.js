
var widgets = widgets || {};

widgets.fader = function (config) {
    
    var _intervalId,
        _durationTime,
        _filename;
    
    if (typeof config !== 'object' ) {
        throw new TypeError("we need a config file.");
    }
    
    function getSetTargetId() {
        if (arguments.length > 0) {
            config.targetId = arguments[0] || "imagePlaceholder";
        }
        
        return config.targetId;
    }
    
    function getSetDurationTime() {
        if (arguments.length > 0) {
            if (typeof arguments[0] !== 'number') {
                throw new TypeError("durationTime should be a number");
            }
            _durationTime = arguments[0] * 1000;
        }
        
        
        return _durationTime / 1000;
    }
    
    function getFileNames() {
        return config.fileNames;
    }
    
    function getRandomPositionBetween(min, max) {
        return Math.floor(min + ((max - 1) - min) * Math.random());
    }
    
    function getRandomFileName() {
        var max = config.fileNames.length - 1;
        return config.fileNames[getRandomPositionBetween(0, max)];
    }
    
    function _getImageId(filename) {
        return 'fade' + filename.substring(0,1).toUpperCase() + filename.substring(1).split('.')[0];
    }
    
    function _addImage(filename) {
        $('<img src="' + config.directory + '/' + filename + '" id="' + _getImageId(filename) + '" class="fadeImage" style="position: absolute; top: 0px; left: 0px;"/>')
            .hide()
            .appendTo('#' + config.targetId);
    }
    
    function _isInDom(filename) {
        return $('#' + _getImageId(_filename)).length > 0;
    }
    
    function _checkAndInsert() {
        _filename = this.getRandomFileName();
        if (!_isInDom(_filename)) {
            _addImage(_filename);
        }
    }
    
    function _fade() {
        var oldImage = $('.fadeImage:visible'),
            newImage = $('#' + _getImageId(_filename));

        newImage.fadeIn(600, function () {
                if (oldImage !== undefined
                    && oldImage.attr('id') !== newImage.attr('id')) {
                    oldImage.fadeOut('slow');
                }
            });
    }
    
    function startFading() {
        var self = this;
        
        _checkAndInsert.call(self);
        _fade();
        
        _intervalId = window.setInterval(function () {
                _checkAndInsert.call(self);
                _fade();
            }, _durationTime);

    }
    
    function stopFading() {
        clearInterval(_intervalId);
    }
    
    
    getSetTargetId(config.targetId);
    getSetDurationTime(config.duration);
    
    return {
        targetId: getSetTargetId,
        getSetDurationTime: getSetDurationTime,
        getFileNames: getFileNames,
        getRandomFileName: getRandomFileName,
        getRandomPositionBetween: getRandomPositionBetween,
        startFading: startFading,
        stopFading: stopFading
    };

};
