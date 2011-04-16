
var widgets = widgets || {};

widgets.Fader = function (config) {
    if (!(this instanceof widgets.Fader)) {
        return new widgets.Fader(config);
    }
    
    this._durationTime = config.duration * 1000;
    this._fileNames = config.fileNames;
    this._directory = config.directory;
    this._targetId = config.targetId || "imagePlaceholder";
    
    this._intervalId;
    this._callCounter = 0;
    return this;
};

(function (p) {
    
    function getDurationTime() {
        return this._durationTime / 1000;
    }
    
    function getFileNames() {
        return this._fileNames;
    }
    
    function getRandomPositionBetween(min, max) {
        return Math.floor(min + ((max - 1) - min) * Math.random());
    }
    
    function getRandomFileName() {
        var max = this._fileNames.length - 1;
        return this._fileNames[getRandomPositionBetween(0, max)];
    }
    
    function _fade() {
        var filename = this.getRandomFileName(),
            prevImageNo = this._callCounter - 1;
            oldImage = $('#image_' + prevImageNo);

        $('<img src="' + this._directory + '/' + filename + '" id="image_' + this._callCounter + '" class="fadeImage" />')
            .hide()
            .appendTo('#' + this._targetId)
            .fadeIn(600, function () {
                oldImage.fadeOut('fast').remove();
            });
        
        this._callCounter += 1;
    }
    
    function startFading() {
        var self = this;

        self._fade();
        this._intervalId = window.setInterval(function () {
                self._fade();
            }, self._durationTime);

        
        // this._intervalId = window.setInterval(function () {
        //     self._fade();
        //     }, this._durationTime);
    }
    
    function stopFading() {
        clearInterval(this._intervalId);
    }
    
    p.getDurationTime = getDurationTime;
    p.getFileNames = getFileNames;
    p.getRandomFileName = getRandomFileName;
    p.getRandomPositionBetween = getRandomPositionBetween;
    p._fade = _fade;
    p.startFading = startFading;
    p.stopFading = stopFading;

})(widgets.Fader.prototype);
