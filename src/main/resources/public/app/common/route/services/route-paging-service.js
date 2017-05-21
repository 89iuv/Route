route.service('RoutePagingService', [function () {
    var showInAll = function(currentPage, totalPages){
        var pageArray = [];
        for (var i = 1; i <= totalPages; i++){
            if (currentPage === i){
                pageArray.push({
                    index: i,
                    class: 'active'
                })
            } else {
                pageArray.push({
                    index : i,
                    class: ''
                })
            }
        }
        return pageArray;
    };
    var showInFirst = function(currentPage, totalPages){
        var pageArray = [];
        for (var i = 1; i <= 9; i++){
            if (currentPage === i){
                pageArray.push({
                    index: i,
                    class: 'active'
                })
            } else {
                pageArray.push({
                    index : i,
                    class: ''
                })
            }
        }

        pageArray.push({
            index : '...',
            class: 'disabled'
        });

        pageArray.push({
            index : totalPages,
            class: ''
        });

        return pageArray;

    };
    var showInMiddle = function(currentPage, totalPages){
        var pageArray = [];
        pageArray.push({
            index : 1,
            class: ''
        });

        pageArray.push({
            index : '...',
            class: 'disabled'
        });

        for (var i = currentPage-3; i <= currentPage+3; i++){
            if (currentPage === i){
                pageArray.push({
                    index: i,
                    class: 'active'
                })
            } else {
                pageArray.push({
                    index : i,
                    class: ''
                })
            }
        }

        pageArray.push({
            index : '...',
            class: 'disabled'
        });

        pageArray.push({
            index : totalPages,
            class: ''
        });

        return pageArray;

    };
    var showInLast = function(currentPage, totalPages){
        var pageArray = [];
        pageArray.push({
            index : 1,
            class: ''
        });

        pageArray.push({
            index : '...',
            class: 'disabled'
        });

        for (var i = totalPages - 8; i <= totalPages; i++){
            if (currentPage === i){
                pageArray.push({
                    index: i,
                    class: 'active'
                })
            } else {
                pageArray.push({
                    index : i,
                    class: ''
                })
            }
        }

        return pageArray;

    };

    this.getPageArray = function(currentPage, totalPages){
        var currentPageNumber = Number(currentPage);
        var totalPagesNumber = Number(totalPages);

        var pageArray = [];
        if (totalPagesNumber < 11) {
            pageArray = showInAll(currentPageNumber, totalPagesNumber);

        } else if(currentPageNumber <= 5 ) {
            pageArray = showInFirst(currentPageNumber, totalPagesNumber);

        } else if (currentPageNumber > 5 && currentPageNumber < totalPagesNumber - 5 ) {
            pageArray = showInMiddle(currentPageNumber, totalPagesNumber);

        } else {
            pageArray = showInLast(currentPageNumber, totalPagesNumber);
        }

        return pageArray;
    }

}]);