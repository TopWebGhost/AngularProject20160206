
app.factory('UtilService', function AssetService($q, $http, $interval) {
    return {
        animatDuration: 100,

        calculateHeight: function (comments, rowHeight, defTextHeight) {
            var textHeight, fakeEl,
                defTextHeight = 19,
                rowHeight = 52,
                newCommentHeight = 85,
                height = newCommentHeight,
                maxAllowedHeight = 300;

            angular.forEach(comments, function (comment) {
                fakeEl = $('.comments-height-calc');
                fakeEl.html('').html(comments[0].text);
                textHeight = fakeEl.outerHeight();

                if (textHeight > defTextHeight) {
                    height += rowHeight - defTextHeight + textHeight;
                } else {
                    height += rowHeight;
                }
            });

            height = height > maxAllowedHeight ? maxAllowedHeight : height;
            return height;
        },

        animateElement: function (elem, animateBy, defMarginTop, spaceToAnimate, increase) {
            var margin,
                times = 100,
                animDuration = this.animatDuration,
                fraction = spaceToAnimate / times,
                counter = increase ? 1 : times;

            $interval(function () {
                margin = defMarginTop + counter * fraction;
                elem.css(animateBy, margin);
                if (increase) {
                    counter++;
                } else {
                    counter--;
                }
            }, animDuration/times, times);
        },

        getFormatedDate: function (dp) {
            return dp.getDate() + '/' + dp.getMonth() + '/' + dp.getFullYear();
        }

    }
});
