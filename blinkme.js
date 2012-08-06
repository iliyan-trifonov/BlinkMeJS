/*
 BlinkMeJS by Iliyan Trifonov
 example:
 var blink = new BlinkMe({
 id: 'elem_id',
 classes: {normal: 'class_normal', blinked: 'class_blink'},
 });
 */
(function(){
    function BlinkMe(params)
    {
        if (false === (this instanceof BlinkMe))
        {
            return new BlinkMe(params);
        }

        if (typeof params == 'undefined' || typeof params.id == 'undefined'
            || (typeof params.colors == 'undefined' && typeof params.classes == 'undefined')
            || (typeof params.colors != 'undefined' && (typeof params.colors.normal == 'undefined' || typeof params.colors.blinked == 'undefined'))
            || (typeof params.classes != 'undefined' && (typeof params.classes.normal == 'undefined' || typeof params.classes.blinked == 'undefined'))
            )
        {
            alert("Blinking.js: Please provide the required params (id ''/['','',..], colors {normal: '', blinked: ''} or classes {normal: '', blinked: ''})!");
            return false;
        }

        if (typeof params.interval == 'undefined') params.interval = 500;
        if (typeof params.autostart == 'undefined') params.autostart = true;
        if (typeof params.start_on_load == 'undefined') params.start_on_load = true;
        if (typeof params.callback_normal == 'undefined') params.callback_normal = false;
        if (typeof params.callback_blinked == 'undefined') params.callback_blinked = false;

        if (typeof params.id != 'object')
        {
            params.id = [params.id];
        }

        this.params = params;
        this.classes = !!params.classes && !!params.classes.normal && !!params.classes.blinked;
        this.text_timer = null;
        this.blinked = false;
        this.els = [];

        if (!this.params.autostart || !this.params.start_on_load)
        {
            //TODO: run this code on dom ready
            this.oldonload = window.onload;
            window.onload = function(){
                if(typeof this.oldonload == 'function') this.oldonload();
                this.init.call(this);
            }.bind(this);
        }

        if(!!this.params.autostart && !!this.params.start_on_load)//TODO: change this to on dom ready
        {
            this.oldonload = window.onload;
            window.onload = function(){
                if(typeof this.oldonload == 'function') this.oldonload();
                this.init.call(this);
                this.start_blink.call(this);
            }.bind(this);
        }
        else if(!!this.params.autostart)//TODO: run this on dom ready - or will break with no this.els, etc.
        {
            this.start_blink();
        }

        return this;
    }

    BlinkMe.prototype.blink = function()
    {
        var old_blinked = this.blinked;
        for (var i = 0; i < this.els.length; i++)
        {
            var el = this.els[i];
            if (!this.blinked)
            {
                if(!!this.classes)
                {
                    this.manageClass(el, this.params.classes.normal, 'remove');//el.classList.remove(params.classes.normal);
                    this.manageClass(el, this.params.classes.blinked, 'add');//el.classList.add(params.classes.blinked);
                }
                else el.style.color = this.params.colors.blinked;
                if (i == this.params.id.length-1) this.blinked = true;
            }
            else
            {
                if(!!this.classes)
                {
                    this.manageClass(el, this.params.classes.blinked, 'remove');//el.classList.remove(params.classes.blinked);
                    this.manageClass(el, this.params.classes.normal, 'add');//el.classList.add(params.classes.normal);
                }
                else el.style.color = this.params.colors.normal;
                if (i == this.params.id.length-1) this.blinked = false;
            }
        }
        if (!!this.params.callback_normal && !!old_blinked && !this.blinked) this.params.callback_normal(this);
        if (!!this.params.callback_blinked && !old_blinked && !!this.blinked) this.params.callback_blinked(this);
    }

    BlinkMe.prototype.start_blink = function()
    {
        this.text_timer = setInterval(this.blink.bind(this), this.params.interval);
    }

    //TODO: check if this will need dom-ready in some situations/browsers
    BlinkMe.prototype.hasClassList = (function()
    {
        var newdiv = document.createElement('div');
        return typeof newdiv.classList != 'undefined';
    })();

    BlinkMe.prototype.init = function()
    {
        var el = null;
        for (var i = 0; i < this.params.id.length; i++)
        {
            el = document.getElementById(this.params.id[i]);
            this.els = this.els.concat(el);
            if(!!this.classes) this.manageClass(el, this.params.classes.normal, 'add');
            else el.style.color = this.params.colors.normal;
        }
    }

    BlinkMe.prototype.manageClass = function(el, name, action)
    {
        if (this.hasClassList)
        {
            if (action == 'add') el.classList.add(name);
            else if (action == 'remove') el.classList.remove(name);
        }
        else
        {
            var reg = new RegExp('\\b'+name+'\\b', 'g');
            if (action == 'add')
            {
                if (!el.className.match(reg)) el.className += ' ' + name;
            }
            else if (action == 'remove')
            {
                if (!!el.className.match(reg)) el.className = el.className.replace(reg, '');
            }
        }
    }

    BlinkMe.prototype.stop_blink = function()
    {
        clearInterval(this.text_timer);
        this.blinked = false;
        for (var i = 0; i < this.params.id.length; i++)
        {
            var el = document.getElementById(this.params.id[i]);
            if(!!this.classes)
            {
                this.manageClass(el, this.params.classes.blinked, 'remove');//el.classList.remove(params.classes.blinked);
                this.manageClass(el, this.params.classes.normal, 'add');//el.classList.add(params.classes.normal);
            }
            else el.style.color = this.params.colors.normal;
        }
    }

    window.BlinkMe = BlinkMe;

})();