BlinkMeJS
=========

Blink a text with style!
Pure JavaScript! No external libs required!
Change text colors, images, transform objects, use multiple options!

BlinkMeJS is a class for making blinking texts by switching between 2 colors or by using classes.
With classes and callback functions one can do more than a blinking text like moving/animating objects, etc.


Examples:

Demo Url: [BlinkMeJS Demo](http://iliyan-trifonov.com/BlinkMeJS/ "BlinkMeJS @ iliyan-trifonov.com")



# Use 2 classes to blink a text:

html:

    <span id="blinking_id1">BLINKING 1</span><br><br>

js:

    var blink1 = new BlinkMe({
        id: 'blinking_id1',
        classes: {normal: 'class_normal', blinked: 'class_blink'}
    });

css:

    .class_normal{
        color: silver;
    }
    .class_blink{
        color: magenta;
    }




# Blink 3 texts with one BlinkMeJS instance:

html:
    
    <span id="similar1">Similar1</span> | <span id="similar2">Similar2</span> | <span id="similar3">Similar3</span>

js:

    var blink4 = BlinkMe({
        id: ['similar1', 'similar2', 'similar3'],
        colors: {normal: 'yellow', blinked: 'blue'},
        interval: 1000
    });




# Make effects using a couple of BlinkMeJS instances + callback and helper functions:

html:

    <span id="eff5">eff5</span> | <span id="eff6">eff6</span> | <span id="eff7">eff7</span> | <span id="eff8">eff8</span>

js:

    var blink9 = new BlinkMe({
        'id': 'eff5',
        classes: {normal: 'eff2_black', blinked: 'eff2_red'},
        interval: 400,
        autostart: true,
        callback_blinked: blinkme_callback2
    });
    var blink10 = new BlinkMe({
        'id': 'eff6',
        classes: {normal: 'eff2_black', blinked: 'eff2_red'},
        interval: 400,
        autostart: false,
        callback_blinked: blinkme_callback2
    });
    var blink11 = new BlinkMe({
        'id': 'eff7',
        classes: {normal: 'eff2_black', blinked: 'eff2_red'},
        interval: 400,
        autostart: false,
        callback_blinked: blinkme_callback2
    });
    var blink12 = new BlinkMe({
        'id': 'eff8',
        classes: {normal: 'eff2_black', blinked: 'eff2_red'},
        interval: 400,
        autostart: false,
        callback_blinked: blinkme_callback2
    });
    //callback
    function blinkme_callback2(blinker)
    {
        clearInterval(blinker.text_timer);
        if (blinker.params.id == 'eff5')
        {
            blink10.start_blink();
        }
        else if (blinker.params.id == 'eff6')
        {
            blink11.start_blink();
        }
        else if (blinker.params.id == 'eff7')
        {
            blink12.start_blink();
        }
        else if (blinker.params.id == 'eff8')
        {
            stop_effs2('eff5');
        }
    }
    //additional function for the effect
    var eff2_timer = null;
    function stop_effs2(id)
    {
        if (id == 'eff5')
        {
            eff2_timer = setTimeout(function() {
                blink9.stop_blink();
                stop_effs2('eff6');
            }, 400);
        }
        else if (id == 'eff6')
        {
            eff2_timer = setTimeout(function() {
                blink10.stop_blink();
                stop_effs2('eff7');
            }, 400);
        }
        else if (id == 'eff7')
        {
            eff2_timer = setTimeout(function() {
                blink11.stop_blink();
                stop_effs2('eff8');
            }, 400);
        }
        else if (id == 'eff8')
        {
            eff2_timer = setTimeout(function() {
                blink12.stop_blink();
                blink9.start_blink();
            }, 400);
        }
    }


css:

    .eff2_black{
        color: black;
    }
    .eff2_red{
        color: red;
    }