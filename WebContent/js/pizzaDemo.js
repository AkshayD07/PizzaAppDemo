var app = angular.module("pizzaApp", []);
app
		.controller(
				"pizzaController",
				function($scope, $http) {
					$scope.showform = false;
					$scope.showcartdiv = false;
					$scope.finalorder = [];
					
					$scope.cartval = $scope.finalorder.length;
					$http.get("datasource/pizzas.json").success(function(data) {
						$scope.data = data;
					}).error(function(data) {
						alert("Error");

					});

					/*
					 * $scope.addProduct = function(prod) { for (var i = 0; i <
					 * $scope.data.length; i++) { if ($scope.data[i].pizza_name ==
					 * prod) { //alert(JSON.stringify($scope.data[i])); } } }
					 */
					$scope.increment = function(pizza) {
						for (var i = 0; i < $scope.data.length; i++) {
							if ($scope.data[i].pizza_name == pizza) {
								$scope.data[i].quantity++;
							}

						}
						console.log($scope.finalorder)

					}
					$scope.decrement = function(pizza) {
						for (var i = 0; i < $scope.data.length; i++) {
							if ($scope.data[i].pizza_name == pizza) {
								$scope.data[i].quantity--;
							}
						}
					}

					$scope.addPizza = function(type, data) {
						if (type == null || type == undefined || type == '') {
							return false;
						} else if (data.quantity == 0
								|| data.quantity == undefined) {
							return false;
						} else {

							data.pizza_type = type;
							// $scope.orderdata.pizza_type=type;
							// alert(JSON.stringify(data));
							$scope.addtoCart(data);
						}
					}

					$scope.addtoCart = function(data) {
						var form = [];
						$scope.total = 0;
						form.quantity = data.quantity;
						form.pizza_name = data.pizza_name;
						form.pizza_price = data.pizza_price;
						form.pizza_type = data.pizza_type;
						if (data.pizza_type == "Regular") {
							form.pizza_price = data.pizza_price_R;
						} else if (data.pizza_type == "Medium") {
							form.pizza_price = data.pizza_price_M;
						} else if (data.pizza_type == "Large") {
							form.pizza_price = data.pizza_price_L;
						}
						if ($scope.finalorder.length > 0) {
							console.log($scope.finalorder, length);
							for (var i = 0; i < $scope.finalorder.length; i++) {
								// console.log(i);
								// console.log($scope.finalorder[i].quantity+"
								// "+data.quantity)
								if ($scope.finalorder[i].pizza_name == form.pizza_name
										&& $scope.finalorder[i].pizza_type == form.pizza_type) {
									$scope.finalorder[i].quantity = $scope.finalorder[i].quantity
											+ form.quantity;
									form = '';
								}
							}

						}

						if (typeof form != 'string') {
							$scope.finalorder.push(form);
							
						}

						if ($scope.finalorder.length > 0) {
							for (var i = 0; i < $scope.finalorder.length; i++) {
								var quantity = form.quantity;
								if ($scope.finalorder[i].quantity != undefined) {
									quantity = $scope.finalorder[i].quantity;
								}
								$scope.total += quantity
										* $scope.finalorder[i].pizza_price;
							}

						}
						
					}
					$scope.showcart = function() {
						$scope.showcartdiv = !$scope.showcartdiv;

					}
					
					$scope.reload=function()
					{
						location.reload();
						
					}
					$scope.showmsg=false;
					$scope.showm=true;
					$scope.showmessage=function(info)
					{
						$scope.name=info.name;
						$scope.add=info.address;
						$scope.showmsg=true;
						$scope.showm=false;
					}
					
						

				});
