(function() {

    angular.module('app').directive('myProgress', myProgress);

    //////////////////////////////////////////////////////////////////

    function myProgress() {

        var compile = function() {
            return function(scope, element, attrs) {
                return scope.$on(attrs.myProgress, function(event, show) {
                    var className = 'my-progress';
                    if (show) {
                        return element.append(angular.element('<div class="' + className + '"><div></div></div>'));
                    } else {
                        return element.children('.' + className).first().remove();
                    }
                });
            };
        };

        return {
            restrict: 'A',
            compile: compile
        };
    }

})();
