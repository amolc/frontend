var baseurl = "http://localhost:9000/shop";

var app = angular.module("adminpanel", ["angular-storage", "angularPayments"]);
app.config([
  "storeProvider",
  function (storeProvider) {
    storeProvider.setStore("sessionStorage");
  },
]);
