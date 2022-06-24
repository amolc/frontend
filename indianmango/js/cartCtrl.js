app.controller(
  "cartCtrl",
  function ($scope, $http, $window, $location, $sce, $timeout, store) {
    var baseurl = "http://localhost:9000/shop/";
    let id = localStorage.getItem("cid");

    $scope.listcart = function (req, res) {
      $http
        .get(baseurl + `api/getcart/allCarts/${id}`)
        .success(function (res) {
          console.log(res);

          if (res.status == "false") {
          } else {
            $scope.carts = res.cartData;
            if (!res.cartData) return;
            let totalPrice = 0;
            let quantity = 0;
            res.cartData.forEach(e=>{
              totalPrice += e.item_picture * e.quantity;
              quantity += e.quantity;
            })
            $scope.totalPrice = totalPrice;
            $scope.quantity = quantity;
            var data = res.cartData[0];
            var arrayBufferView = new Uint8Array(data.item_picture.data);
            var blob = new Blob([arrayBufferView], {
              type: "image/jpeg",
            });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            $scope.image = imageUrl;
          }
        })
        .error(function () {});
    };
    $scope.cartDelete = function (id) {
      console.log(id);
      // console.log("cart ID ", cartID);
      // console.log("Product ID ", productID);
      console.log(baseurl);
      $scope.formvalidate = "true";
      console.log("New delete");
      console.log($scope.carts);
      $http
        .post(baseurl + "api/remove/removeProduct", { cartID:id})
        .success(function (res) {
          $scope.response = res;
          console.log(res);
          if (res.status == "false") {
            alert(res.message);
          } else {
            alert("org deleted");
            location.reload();
          }
        });
    };
  }
);
