
var widgets = widgets || {};

widgets.fader = function (config) {
    
    var _intervalId,
        _callCounter = 0,
        _durationTime;
    
    function getSetTargetId() {
        if (arguments.length > 0) {
            config.targetId = config.targetId || "imagePlaceholder";
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
    
    function _fade(filename) {
        var prevImageNo = _callCounter - 1;
            oldImage = $('#image_' + prevImageNo);

        $('<img src="' + config.directory + '/' + filename + '" id="image_' + _callCounter + '" class="fadeImage"/>')
            .hide()
            .appendTo('#' + config.targetId)
            .fadeIn(600, function () {
                oldImage.fadeOut('fast').remove();
            });
        
        _callCounter += 1;
    }
    
    function startFading() {
        var self = this,
            filename = self.getRandomFileName();

        _fade(filename);
        _intervalId = window.setInterval(function () {
                filename = self.getRandomFileName();
                _fade(filename);
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
