app.controller(
  "cardDetailCtrl",
  function ($scope, $http, $window, $location, $sce, $timeout, store) {
    var baseurl = "http://localhost:9000/shop/";

    let itemTitle = document.getElementById("itemTitle");
    let itemPrice = document.getElementById("itemPrice");
    let itemDescription = document.getElementById("itemDescription");
    $scope.listcardDetail = function (req, res) {
      const data = JSON.parse(localStorage.getItem("descriptionDetails"));
      console.log(data);
      $scope.image = data.item_image;
      itemTitle.innerHTML = data.item_name;
      itemDescription.innerHTML = data.item_description;
      itemPrice.innerHTML = `$${data.item_price}`;

      //   console.log(124475);
    };

    $scope.addtoCart = function () {
      let id = JSON.parse(localStorage.getItem("org_id"));
      console.log(localStorage.getItem("cid"));

      localStorage.setItem("toShowId", JSON.stringify(id));
      $http
        .post(
          baseurl + "api/cart/addToCart",
          JSON.stringify({
            productID: id,
            cartID: localStorage.getItem("cid"),
            quantity: $scope.quantity,
          })
        )
        .success(function (res) {
          if (res.status == "false") {
            // console.log(1346);
          } else {
            id = [res.cartID];
            localStorage.setItem("cid", id);

            console.log(res);
            console.log(id);
            // alert(res.msg);
            window.location.assign("./cart.html");
          }
        })
        .error(function () {});
    };
  }
);
