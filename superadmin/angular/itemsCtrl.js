app.controller('itemsCtrl', function($scope, $http, $window, $location, $sce, $timeout, store, config) {


    $scope.data = {}
    $scope.givealert = function(req, res) {

        alert("I am alert");
    }

    $scope.init = function(req, res) {


    }

    $scope.list = function(req, res) {
        $http.get(config.baseurl + 'items/')
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
    }


    $scope.add = function(req, res) {

        alert($scope.data.thumbnail);

        console.log($scope.data);
        if ($scope.data.id != "") {
            $http.put(config.baseurl + 'items/', $scope.data)
                .success(function(res) {
                    if (res.status == 'false') {} else {
                        $scope.response = res.data;
                        console.log('message: ', $scope.response);
                        window.location.reload();
                    }
                }).error(function() {});
        }
        $http.post(config.baseurl + 'items/', $scope.data)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.response = res.data;
                    console.log('message: ', $scope.response);
                    window.location.reload();
                }
            }).error(function() {});

    }


    $scope.update = function(id) {
        $http.get(config.baseurl + 'items/' + id)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('data: ', $scope.data);
                }
            }).error(function() {});
    }

    $scope.delete = function(id) {
        $http.delete(config.baseurl + 'items/' + id)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.response = res.data;
                    console.log('data: ', $scope.response);
                }
            }).error(function() {});
        $window.location.reload();
    }





    $scope.redirect = function() {
        //console.log("redirect");
        location.href = 'index.html';
    }


    $scope.updateattachment = function() {
        console.log('yes');
        var img = new Image();
        var newfile = document.getElementById("file_browse").files[0];
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var imageType = /image.*/;
        if (newfile.type.match(imageType)) {
            var oFReader = new FileReader();
            oFReader.onload = function(oFREvent) {
                $scope.data.thumbnail = document.getElementById("file_browse").files[0].name;
                console.log($scope.data.thumbnail);
                $scope.data.thumbnailimage = oFReader.result;
                console.log($scope.data.thumbnailimage);
                $scope.$apply();

            };
            oFReader.readAsDataURL(newfile);
            console.log($scope.data);
        } else {
            $scope.item.item_imagename = '';
            $scope.item.item_image = '';
        }
    };



    //orderCtrl ends
});