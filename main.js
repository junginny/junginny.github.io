function totalPrice() {
	var totalPrice = document.getElementById("totalPriceVal");
	totalPrice.innerText = 2.99*document.getElementById("quant").value;
}

var glaze = [["None", "img/pumpkinspice.jpg"], ["Sugar-Milk", "img/pumpkinspice.jpg"], ["Vanilla-Milk", "img/pumpkinspice.jpg"], ["Double Chocolate", "img/pumpkinspice.jpg"]]
class CartItem {
	constructor(image, roll, glaze, quantity){
		this.image = image;
		this.roll = roll;
		this.glaze = glaze;
		this.quantity = quantity;
		this.price = function(){
			console.log(this.quantity);
			return parseInt(this.quantity) * 2.99;
		}
	}
}

//variables declared
var itemsForCheckout = [];
var select = document.getElementById("glaze");
var quant = document.getElementById("quant");
var glazeChoice;
var quantity;
var itemsInCart = 0;

//global variable for subtotal calculation in cart.html page
var cartSubtotal = 0;

//updates number of items represented in cart after hitting add to cart button
var addToCart = document.getElementById("cart-button");

if(addToCart != null){
	addToCart.onclick = function(){
		glazeChoice = select.options[select.selectedIndex].text;
		var image = "img/pumpkinspice.jpg";
		var kindOfBun = "Pumpkin Spice";
		quantity = quant.options[quant.selectedIndex].text;
		updateCart(quantity);
		select.selectedIndex = 0;
		quant.selectedIndex = 0;
		let roll = new CartItem(image, kindOfBun, glazeChoice, quantity);
		itemsForCheckout.push(roll);
		localStorage.setItem("rollsToPurchase", JSON.stringify(itemsForCheckout));
	}
}

function updateCart(quantity){
	var cart = document.getElementById("counter");
	if (isNaN(quantity) == false){
		itemsInCart += parseInt(quantity);
		cart.innerHTML = "<span> " + itemsInCart + " </span>";
	}
}

//populates cart when window loads, generates table of data
window.onload = function(){
	populateCart();
}

var cartData = JSON.parse(localStorage.getItem("rollsToPurchase"));

function populateCart(){
	console.log(cartData);
	var cartDataArray = [];
	var removeButton = "<span class='remove' onclick='deleteRow(this)'> Remove </span>";
	for (i = 0; i < cartData.length; i++){
		let cell = [cartData[i].image, cartData[i].roll, cartData[i].glaze, cartData[i].quantity, "$" + parseInt(cartData[i].quantity) * 2.99, removeButton];
		cartDataArray.push(cell);
	}

	var cartInfo = document.getElementById("cartInfo");
	for (i = 0; i < cartDataArray.length; i++){
		var R = document.createElement("tr");
		for(j = 0; j < cartDataArray[i].length; j++){
			var C = document.createElement("td");
			if(j === 0){
				C.innerHTML = "<img src='img/pumpkinspice.jpg' width='100px' height='100px'>";	
			} else if(j === cartDataArray[i].length - 1){
				C.innerHTML = cartDataArray[i][j];
			}
			else{
			C.innerText = cartDataArray[i][j];
			}
			R.appendChild(C);
		}
		cartInfo.appendChild(R);
	}
}


//Removes elements from cart and local storage
var remove = document.getElementsByClassName("remove");


function deleteRow(remove) {
    var i = remove.parentNode.parentNode.rowIndex;
    console.log(i);
    removeItem(i);
    document.getElementById("cartInfo").deleteRow(i);
}

function removeItem(i) {
    var updatedCart = cartData.splice(i-1, 1);
    localStorage.setItem("rollsToPurchase", JSON.stringify(cartData));
}


//6B extra credit stuff: carousel of other products
var carouselIndex = 1;
showCarousel(carouselIndex);

function moveCarousel(n) {
  showCarousel(carouselIndex += n);
}

function showCarousel(n) {
  var i;
  var carousel = document.getElementsByClassName("carousel");
  if (n > carousel.length) {carouselIndex = 1}    
  if (n < 1) {carouselIndex = carousel.length}
  for (i = 0; i < carousel.length; i++) {
      carousel[i].style.display = "none";  
  }
    
  carousel[carouselIndex-1].style.display = "inline-block";  
}
