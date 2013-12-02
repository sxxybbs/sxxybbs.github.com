(function ($) {

    /* 
    jQuery插件，模拟打字输出
    参数说明：
    text 要显示的的字符
    ←n 表示向前删除n个字符
    →n 表示向后一次性输出n个字符
    options 相关参数（可选）
    {
    speed:输出间隔（单位毫秒）,
    pauseRate: 暂停概率（0-1）
    }

    callback 回调函数（可选）
    调用方式：
    $("#id").swTextTyping("abcdefg");
    */
    $.fn.swTextTyping = function (text, options, callback) {
        var str = text;
        var len = str.length;
        var str_show = "";
        var index = 0;
        var obj = $(this);
        var del_num = 0;

        //暂停
        var show_p = false;
        var wait_span = 0;

        var defaults = {
            speed: 200,
            pauseRate: 0.05
        };

        var opts = $.extend(defaults, options);

        if (opts.speed == "slow") {
            opts.speed = 500;
        }
        else if (opts.speed == "normal") {
            opts.speed = 200;
        }
        else if (opts.speed == "quick") {
            opts.speed = 100;
        }

        if (opts.pauseRate > 1) {
            opts.pauseRate = 1;
        }
        else if (opts.pauseRate < 0) {
            opts.pauseRate = 0;
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * 10000000) % (max - min) + min;
        }
        //console.log(opts.pauseRate);
        //输出文字
        function w() {

            if (index < len) {
                show_p = false;

                if (del_num > 0) {
                    str_show = str_show.substr(0, str_show.length - 1);
                    del_num--;
                }
                else {
                    var c = str.substr(index, 1);
                    if (c == "←") {

                        //出现删除前，会有较大概率出现暂停
                        if (Math.random() < 0.1 + 0.9 * opts.pauseRate) {
                            wait_span = getRandomNumber(2, 4);
                            p();
                            return;
                        }

                        index++;
                        del_num = parseInt(str.substr(index, 1));
                        index++;
                    }
                    else {
                        if (Math.random() < opts.pauseRate) {
                            wait_span = getRandomNumber(2, 4);
                            p();
                            return;
                        }
                        if (c == "→") {
                            index++;
                            var add_num = parseInt(str.substr(index, 1));
                            c = str.substr(index + 1, add_num);
                            index += add_num;
                        }
                        str_show += c;
                        index++;
                    }
                }

                obj.html(str_show+'<span class="blink">_</span>');

                window.setTimeout(w, getRandomNumber(Math.floor(opts.speed * 0.5), Math.floor(opts.speed * 1.5)));
            }
            else if (callback != null) {
                callback();
            }else{
                //obj.html(str_show+'<span class="blink">_</span>');
                test();
            }
        }

        //显示暂停输出状态
        function p() {

            if (wait_span > 0) {
                if (show_p) {
                    obj.html(str_show);
                    show_p = false;
                }
                else {
                    obj.html(str_show + "|");
                    show_p = true;
                }
              
                wait_span--;
                window.setTimeout(p, opts.speed * 2);
            }
            else {
                w();
            }
        }
        w();

        function test(){
            $(".blink").fadeOut("slow");
            $(".blink").fadeIn("slow");
            setTimeout(test(),500);
        }
    }
})(jQuery);