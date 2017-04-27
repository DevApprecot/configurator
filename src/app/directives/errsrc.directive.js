(function () {
    'use strict';

    angular
        .module('configurator')
        .directive('errSrc', errSrc);

    errSrc.$inject = [];

    function errSrc() {

        var directive = {
            bindToController: true,
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }

})();