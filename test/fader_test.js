TestCase("FaderTests", sinon.testCase({
    setUp: function () {

        this.test = {};
        this.test.fileNames = ["file1.jpg", "file2.jpg", "file3.jpg", "file4.jpg", "file5.jpg"];
        this.test.fader = widgets.fader({
            fileNames: this.test.fileNames,
            directory: "/images",
            duration: 5
        });
        
        this.clock = sinon.useFakeTimers();
    },
    
    tearDown: function () {
        
    },
    
    "test creats an fader object":
    function () {
        assertObject(this.test.fader);
    },
    
    "test error if config isn't defined":
    function () {
        assertException("Config file error", widgets.fader, new TypeError());
    },
    
    /*
        TODO 
        - setze Dauer √
        - set files' directory √
        - setze Dateiliste √
        - wähle zufällig aus liste √
        - start fading √
        - stop fading √
    */
    
    "test duration time":
    function () {
        assertEquals(5, this.test.fader.getSetDurationTime());
    },
    
    "test file name list":
    function () {
        assertEquals(this.test.fileNames, this.test.fader.getFileNames());
    },
    
    "test gets a position":
    function () {
        var i,
            min = 2,
            max = 40,
            value;
        
        for (i = 0; i < 500; i += 1) {
            value = this.test.fader.getRandomPositionBetween(min, max);
            assert(value >= min && value <= max);
        }
    },
    
    "test chooses a random file name from list":
    function () {
        var fileName,
            i;
        function isInList(list, value) {
            var i;
            for (i = 0, max = list.length; i < max; i += 1) {
                if (list[i] === value) {
                    return true;
                }
            }
            return false;
        }
        
        for (i = 0; i < 50; i += 1) {
            fileName = this.test.fader.getRandomFileName();
            assert(isInList(this.test.fileNames, fileName));
        }
    },

    "test starts fading":
    function () {
        /*:DOC += <div id="imagePlaceholder"></div>*/
        
        var image;
        sinon.stub(this.test.fader, 'getRandomFileName').returns('file1.jpg');
        this.test.fader.startFading();

        image = document.getElementById('fadeFile1');
        assertEquals('/images/file1.jpg', image.getAttribute('src'));
        
        this.test.fader.stopFading();
        this.test.fader.getRandomFileName.restore();
    },
    
    "test change image":
    function () {
        /*:DOC += <div id="imagePlaceholder"></div>*/
        
        var image;
        sinon.stub(this.test.fader, 'getRandomFileName').returns('file1.jpg');
        this.test.fader.startFading();

        image = document.getElementById('fadeFile1');
        assertEquals('/images/file1.jpg', image.getAttribute('src'));
        

        this.test.fader.getRandomFileName.restore();
        sinon.stub(this.test.fader, 'getRandomFileName').returns('file2.jpg');
        this.clock.tick(5000);
        image = document.getElementById('fadeFile2');
        assertEquals('/images/file2.jpg', image.getAttribute('src'));

                
        this.test.fader.stopFading();
        this.test.fader.getRandomFileName.restore();
    },
    
    "test image doesn't change":
    function () {
        /*:DOC += <div id="imagePlaceholder"></div>*/
        
        var image;
        sinon.stub(this.test.fader, 'getRandomFileName').returns('file1.jpg');
        this.test.fader.startFading();

        image = document.getElementById('fadeFile1');
        this.clock.tick(5000);
        image = document.getElementById('fadeFile1');
        assertEquals('block', image.style.display);

        this.test.fader.stopFading();
        this.test.fader.getRandomFileName.restore();
    }
}));