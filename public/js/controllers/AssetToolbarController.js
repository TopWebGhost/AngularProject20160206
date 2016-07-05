'use strict';
app.controller('AssetToolbarController', [
    '$scope',
    '$rootScope',
    '$http',
    '$compile',
    'AssetService',
    'UtilService',
    '$timeout',
    '$interval',
    function ($scope, $rootScope, $http, $compile, AssetService, UtilService, $timeout, $interval) {
        var vm = this;
        vm.showNewcomment = false;
        vm.showFfilebutton = false;
        vm.showSfilebutton = false;
        vm.clickComment = function(){

            vm.showNewcomment = !vm.showNewcomment;
        };
        vm.toggleButton = function( file){
            if(file === "firstfile")
             vm.showFfilebutton = !vm.showFfilebutton;
            if(file === "secondfile")
             vm.showSfilebutton = !vm.showSfilebutton;
        };

        vm.placeholders = {
            showComments: false,
            showScenarios: false,
            showApproval: false,
            showFiles: false,
            reset: function (activePlaceholder) {
                for (var prop in this) {
                    if (activePlaceholder !== prop && typeof this[prop] === 'boolean') {
                        this[prop] = false;
                    }
                }

                this[activePlaceholder] = !this[activePlaceholder];
            },
            getActivePlaceholder: function () {
                var placeholder = '';
                for (var prop in this) {
                    if (typeof this[prop] === 'boolean') {
                        placeholder = prop;
                        break;
                    }
                }
                return placeholder;
            }
        };
        vm.comments = [];
        vm.defMarginTop = 100;

        //$scope stuff
        $scope.$watch(
            "showToolbar",
            function toolbarChange(newValue) {
                vm.showToolbar = newValue;
            }
        );

        $scope.$on("comment-update", function (e, commentCount) {
             // UtilService.calculateHeight();
        });
        //End $scope stuff

        vm.loadCommentsForCategory = function (ev, categories, category) {
            ev.stopPropagation();

            angular.forEach(categories, function (cat) {
                cat.selected = false;
            });
            category.selected = true;

            var assetDetail = $(ev.target).closest('.asset-toolbar').next(),
                activePlaceholder = vm.placeholders.getActivePlaceholder();
            vm.populateComments(assetDetail, vm.defMarginTop, activePlaceholder, category, false);
        }

        vm.activateToolbarDetail = function (ev, activePlaceholder) {
            var assetDetail = $(ev.target).closest('.asset-toolbar').next(),
                defMarginTop = vm.defMarginTop,
                category;

            ev.stopPropagation();
            vm.placeholders.reset(activePlaceholder);

            switch (activePlaceholder) {
                case "showComments":
                    vm.categories = $rootScope.activeCategories;
                    vm.categories[0].selected = true;
                    category = vm.categories[0];
                    vm.populateComments(assetDetail, defMarginTop, activePlaceholder, category, true);
                    break;

                default:
                if (vm.placeholders[activePlaceholder]) {
                    UtilService.animateElement(assetDetail, 'margin-top', defMarginTop, 300, true);
                } else {
                    var spaceToAnimate = assetDetail.offset().top - defMarginTop;
                    UtilService.animateElement(assetDetail, 'margin-top', defMarginTop, spaceToAnimate, false);
                }
            }
        }

        vm.populateComments = function (assetDetail, defMarginTop, activePlaceholder, category, customAnimateOnLoad) {
            var spaceToAnimate;
            //Tracker to give the category change feeling.
            vm.odd = !vm.odd;

            if (vm.placeholders[activePlaceholder]) {
                AssetService.getComments(category, vm.odd)
                  .then(function(response) {
                        var comments = response,
                            height = UtilService.calculateHeight(comments);

                        //$('.tb-comments-placeholder').height(height);
                        vm.comments = comments;
                        console.log(comments);
                        spaceToAnimate = height;

                        if (customAnimateOnLoad) {
                            UtilService.animateElement(assetDetail, 'margin-top', defMarginTop, spaceToAnimate, true);
                        }
                  })
                  .catch (function() {
                    console.log('Error to read data');
                });
            } else {
                spaceToAnimate = assetDetail.offset().top - defMarginTop;
                UtilService.animateElement(assetDetail, 'margin-top', defMarginTop, spaceToAnimate,  false);
            }
        }

        vm.onDetailClick = function (ev) {
            ev.stopPropagation();
        }

        vm.editMode = function (comment) {
            comment.edit = !comment.edit;
        }

        vm.saveComment = function (comment) {
            comment.edit = !comment.edit;
        }

        vm.removeComment = function (index) {
            vm.comments.splice(index, 1);
        }



    }]
);
