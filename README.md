BlinkMeJS
=========

JS class for making blinking texts switching between 2 colors or by using classes. With classes and callback functions one can do more than a blinking text like moving/animating objects, etc.


Examples:

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
