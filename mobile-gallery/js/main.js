window.onload = function() {
    // 加载图片
    (function() {
        var temp = "";
        var sIndex = 0;
        var aa = null;
        $.getJSON('js/data.js', function(data) {
            var imgArr = data.img;
            $.each(imgArr, function(index, obj) {
                if (index >= 10) {
                    return;
                }
                var img = new Image();
                var div = $("<div class='thumbnail' data-index=" + sIndex + "></div>");

                temp = $(div).append($(img).addClass("animated bounceIn"));
                $('.m-gallery').append(temp);
                imgArr.shift();

                img.src = obj.picUrl;
                sIndex++;
            });

            var winH = $(window).height();
            $(window).on("scroll", scrollHandler);

            function scrollHandler(e) {
                return (function(e) {
                    var scrT = $(window).scrollTop();
                    var boxT = $(".m-gallery div:last").offset().top;
                    if (scrT >= (boxT - winH + 50)) {
                        $(window).off("scroll");
                        $.each(imgArr, function(index, obj) {
                            if (index >= 10) {
                                return;
                            }
                            var img = new Image();
                            var div = $("<div class='thumbnail' data-index=" + sIndex + "></div>");

                            temp = $(div).append($(img).addClass("animated bounceIn"));
                            $('.m-gallery').append(temp);
                            imgArr.shift();

                            img.src = obj.picUrl;
                            sIndex++;
                        });
                        $(window).on("scroll", scrollHandler);

                    }
                })(e);
            }

        });


    })();

    // 查看大图
    var index = 0;
    var src = "";
    $(".m-gallery").on('click', ".thumbnail", function(e) {
        e.preventDefault();
        e.stopPropagation();
        index = $(this).data("index");
        src = $(this).find("img").attr("src");
        $(".bigimg").attr("src", src);
        $(".m-gallery").addClass('hide');
        $(".m-viewbox").attr("index", index).removeClass('hide');
    });
    $(".m-viewbox").on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".m-gallery").removeClass('hide');
        $(".m-viewbox").addClass('hide');
    });
    $(".m-viewbox").swipe({
        swipe: function(e, direction, distance, duration, fingerCount, fingerData) {
            if (direction == "left") {
                index = $(this).attr("index") * 1 + 1;
                src = $(".m-gallery img").eq(index).attr("src");
                $(".bigimg").addClass('animated slideInRight').attr("src", src);
                $(this).attr("index", index);
                $(".bigimg").get(0).addEventListener("webkitAnimationEnd", function() {
                    $(this).removeClass("animated slideInRight");
                    $(".bigimg").get(0).removeEventListener("webkitAnimationEnd", function() {
                        return;
                    });
                });
            } else if (direction == "right") {
                index = $(this).attr("index") * 1 - 1;
                src = $(".m-gallery img").eq(index).attr("src");
                $(".bigimg").addClass('animated slideInLeft').attr("src", src);
                $(this).attr("index", index);
                $(".bigimg").get(0).addEventListener("webkitAnimationEnd", function() {
                    $(this).removeClass("animated slideInLeft");
                    $(".bigimg").get(0).removeEventListener("webkitAnimationEnd", function() {
                        return;
                    });
                });
            }
        }
    });


};