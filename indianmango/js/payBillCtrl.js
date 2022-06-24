app.controller(
  "payBillCtrl",
  function ($scope, $http, $window, $location, $sce, $timeout, store) {
    var baseurl = "http://localhost:9000/shop/";

    $scope.listpayBill = function () {
      let id = localStorage.getItem("cid");
      $http
        .get(baseurl + `api/getcart/allCarts/${id}`)
        .success(function (res) {
          $scope.carts = res.cartData;
          if (!res.cartData) return;
          console.log(res);
          let totalPrice = 0;
          let quantity = 0;
          res.cartData.forEach(e=>{
            totalPrice += e.item_price  * e.quantity;
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
        });
      $scope.getFormData = function () {
        var full_name = document.getElementById("full_name").value;

        var user_address = document.getElementById("user_address").value;
        var zipcode = document.getElementById("user_post_code").value;
        var user_city = document.getElementById("user_city").value;
        var user_country = document.getElementById("user_country").value;
        var card_number = document.getElementById("card-number").value;
        var card_expiry = document.getElementById("card-expiry").value;
        var card_cvc = document.getElementById("card-cvc").value;
        var id = JSON.parse(localStorage.getItem("cartId"));
        console.log(id);
        console.log(full_name);
        console.log(user_address);
        console.log(zipcode);
        console.log(user_city);
        console.log(user_country);
        console.log(card_number);
        console.log(card_expiry);
        console.log(card_cvc);
        console.log(12346);

        var formData = {
          fullName: full_name,
          address: user_address,
          zipCode: zipcode,
          city: user_city,
          country: user_country,
          cardNumber: card_number,
          expiryDate: card_expiry,
          cardCode: card_cvc,
          cartID: id,
        };
        $http
          .post(baseurl + "/api/bill/payBill", formData)
          .success(function (res) {
            if (res.status == "false") {
              console.log("if");
            } else {
              $scope.payBill = res;
              console.log($scope.payBilles);
              console.log("else");
              window.location.assign("./index.html");
            }
          })
          .error(function () {});
      };
      console.log(12231456);
    };
  }
);
