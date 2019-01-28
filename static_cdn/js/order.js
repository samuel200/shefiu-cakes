$(() => {
    let orderButton = $("div.product-card div.cover a");
    let orderCount = Cookies.get("count");
    console.log(typeof(orderCount));
    let orderCountHolder = $("#shopping-cart > span");

    // This is to find out if the count cookie has already been set
    if(orderCount == undefined || orderCount == "undefined" || orderCount == "NaN"){
        console.log('the order count has not been set yet.');
        orderCount = 0;
        Cookies.set("count", `${orderCount}`);
    }

    // This is to make sure that when ever the page is refreshed the count of the order is still intact
    if (Cookies.get('count')) {
        $("#shopping-cart > span").text(Cookies.get('count'));
    } else {
        $("#shopping-cart > span").text(0);
    }

    orderButton.click((e) => {
        e.preventDefault();

        // grabbing the name of the product selected
        let name = $(e.currentTarget).parent().parent().find('p').text();
        console.log(name);

        // This is to check if the order has already been placed
        let alreadyOrdered = false;

        for(let i = 1; i <= orderCount; i++){
            if(Cookies.get(`order${i}`) == name){
                alreadyOrdered = true;
                let currentOrderAmount = parseInt(Cookies.get(`order${i}Amount`));
                currentOrderAmount++;
                Cookies.set(`order${i}Amount`, `${currentOrderAmount}`);
            }
        }

        if(!alreadyOrdered){
            orderCount++;
            Cookies.set("count", orderCount);
            Cookies.set(`order${orderCount}`, name);
            Cookies.set(`order${orderCount}Amount`, 1);
        }

        orderCountHolder.text(orderCount);

    })
})