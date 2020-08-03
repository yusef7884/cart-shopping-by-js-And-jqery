// const cartBtn = document.querySelector(".cart-btn");
// const closeCartBtn = document.querySelector(".close-cart");
// const clearCartBtn = document.querySelector(".clear-cart");
// const cartDOM = document.querySelector(".cart");
// const cartOverlay = document.querySelector(".cart-overlay");
// const cartItems = document.querySelector(".cart-items");
// const cartTotal = document.querySelector(".cart-total");
// const cartContent = document.querySelector(".cart-content");
// const productsDOM = document.querySelector(".products-center");


//displayCart
$(".add-to-cart").click(function(event) {
    event.preventDefault();
    let name = $(this).attr("data-name");
    let price = $(this).attr("data-price");

      shoppingCart.addItem( name,price,1)
       displayCart();
  });

  $("#clear-cart").click(function(event){
      shoppingCart.clearCart();
      displayCart();
  });

 function displayCart(){
     let cartArray = shoppingCart.listCart();
     let output = "";

     for (let i in cartArray) {
   output += "<li>"
      +cartArray[i].name
      +"<input class='item-count' type='number' data-name='"+cartArray[i].name+
      "' value=' "+cartArray[i].count+"'>"
      +" X "+cartArray[i].price
      +" = "+cartArray[i].total
      +" <button class='plus-item' data-name='"+cartArray[i].name+"'>+</button>"
      +" <button class='subtract-item' data-name='"+cartArray[i].name+"'>-</button>"
      +" <button class='delete-item' data-name='"+cartArray[i].name+"'>X</button>"
      +"</li>"
  }


  $("#show-cart").html(output);
  $("#count-cart").html(shoppingCart.countCart());
  $("#total-cart").html(shoppingCart.totalCart() );
 }

 $("#show-cart").on ("click", ".delete-item", function(event){
     let name = $(this).attr("data-name");
     shoppingCart.removeAll(name);
     displayCart();
 });

 $("#show-cart").on("click", ".subtract-item", function(event){
     let name = $(this).attr("data-name");
     shoppingCart.remove(name);
     displayCart();

 });

 $("#show-cart").on("click", ".plus-item" , function(event){
     let name = $(this).attr("data-name");
     shoppingCart.addItem(name,0,1)
     displayCart();
 });

 $("#show-cart").on("change", ".item-count",function(event){
     let name = $(this).attr("data-name");
     let count =Number( $(this).val());
     shoppingCart.setCountForItem(name , count);
     displayCart();
 });

//////////////////////////////////////////////////////////


let shoppingCart =(() => {
    //Private methods and properties
    let cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count
     };
    
     function saveCart() {
        localStorage.setItem('shoppingCart',JSON.stringify(cart));
    }
   
    function loadCart() {
       cart = JSON.parse(localStorage.getItem('shoppingCart'));
   } 
   loadCart();
  
    //Public methods and properties
    let obj = {};


    obj.addItem = function (name, price,count) {
        for(let i in cart){
            if(cart[i].name === name){
              cart[i].count += count;
              saveCart();
               return;
            }
        }
         console.log("addItemTo Cart:",name,price,count);

        let item = new Item(name, price, count);
            cart.push(item);
            saveCart();
    };


    obj.setCountForItem = function(name , count){
        for(let i in cart){
            if (cart[i].name === name){
               cart[i].count = count;
                break;
            }
        }
        saveCart();
    };
    
    obj.remove= function (name) {
        for (let i in cart) {
            if(cart[i].name === name) {
                cart[i].count --;
                if(cart[i].count === 0) {
                    cart.splice(i,1);
                }
                return;
            }
        }
       saveCart();
    };

    obj.removeAll = function (name) {
        for (let i in cart) {
            if(cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
       saveCart();
    }
     
    obj.clearCart = function (){
         cart=[];
        saveCart();
     }
    
     obj.countCart = function () {
         let totalCount = 0;
         for(let i in cart) {
             totalCount +=cart[i].count;
    
         }
         return totalCount;
     }
    
     obj.totalCart = function () {
         let totalCost = 0 ;
         for (let i in cart) {
             totalCost += cart[i].price * cart[i].count;
         }
         return totalCost.toFixed(2);
     }
    
     obj.listCart = function () {
         let cartCopy = [];
         for (let i in cart){
             let item = cart[i];
             let itemCopy = {};
             for(let p in item) {
                 itemCopy[p] = item[p];
             }
             itemCopy.total = (item.price * item.count).toFixed(2);
             cartCopy.push(itemCopy);
         }
         return cartCopy;
     }

    return obj;
}) ();

//-----------------------------------------

//displayCart();

//shopping Cart functions 

