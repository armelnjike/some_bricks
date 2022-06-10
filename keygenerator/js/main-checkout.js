(function($){
    var cart = JSON.parse(sessionStorage.getItem('cart'));
    var tprice = 0;

    for(i = 0 ;  i < Object.keys(cart).length ; i++){

        $prod = $('<div>',{'class':'order-col prod'})
        $div = $('<div>');
        $div.text(cart[i]['qty'] + "x " + cart[i]['name']);
        $prod.append($div);
        $div = $('<div>');
        $div.text("$" + parseInt(cart[i]['price']) * cart[i]['qty']);
        $prod.append($div);

        $('.order-summary').append($prod);

        tprice+=parseInt(cart[i]['price']  * cart[i]['qty'] );
    }

    data = "";
    data+="<div class='order-col shipping'>";
        data+="<div>Shiping</div>";
        data+="<div><strong>FREE</strong></div>";
    data+="</div>";

    $('.order-summary').append(data);
    
    data = "";
    data+="<div class='order-col totalprice'>";
        data+="<div><strong>TOTAL</strong></div>";
        data+="<div><strong class='order-total'>$"+tprice+"</strong></div>";
    data+="</div>";

    $('.order-summary').append(data);

    $('.close-order').one('click',function(){
        sessionStorage.removeItem('cart');
        //sessionStorage.clear();
        location.href = "./index.php";
    });

})(jQuery);


{/* <div class="order-products">
								<div class="order-col">
									<div>1x Product Name Goes Here</div>
									<div>$980.00</div>
								</div>
								<div class="order-col">
									<div>2x Product Name Goes Here</div>
									<div>$980.00</div>
								</div>
							</div>
							<div class="order-col shipping">
								<div>Shiping</div>
								<div><strong>FREE</strong></div>
							</div>
							<div class="order-col totalprice">
								<div><strong>TOTAL</strong></div>
								<div><strong class="order-total">$2940.00</strong></div>
							</div> */}