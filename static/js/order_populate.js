$(()=>{
    let orderCountHolder = $("#shopping-cart > span");
    let orderList = $("div#body");
    let orderCount = parseInt(orderCountHolder.text());
    let orderBody = $("#body");
    let removeButton = $(".remove");

    // listening for any changes in the body of the table

    removeButton.click((e)=>{
        e.preventDefault();
        console.log("remove button clicked");
        let parent = e.currentTarget.parent().parent();
        parent.hide();
        let targetName = parent.find("p.name");

        for(let i = 1; i <= orderCount; i++){
            if(Cookies.get(`order${i}`) == targetName){
                Cookies.clear(`order${i}`, {path: '/'});
                Cookies.clear(`order${orderCount}Amount`, {path: '/'});
                Cookies.clear(`order${orderCount}Price`, {path: '/'});
                Cookies.clear(`order${orderCount}ImageUrl`, {path: '/'});
                orderCount--;
                Cookies.set('count', orderCount, {path: '/'});
                break;
            }
        }

    })

    // populating the order table
    if(parseInt(orderCountHolder.text()) < 1){

        orderList.append("<h2 id='empty'>There are no orders made</h2>");
    
    }else{
        for(let i = 1; i <= orderCount; i++){
            console.log("templating")
            let name = Cookies.get(`order${i}`);
            let price = Cookies.get(`order${i}Price`);
            let count = Cookies.get(`order${i}Amount`);
            let imageUrl = Cookies.get(`order${i}ImageUrl`);
            let subtotal = parseInt(price) * parseInt(count);
            console.log(typeof(name));
            let template = `<div class="order-body">
                <div class="order-body-item">
                    <div class="product-item">
                        <img src="${imageUrl}" alt="snacks1">
                        <div>
                            <p class="name">${name}</p>
                            <button type="submit" class="remove"><i class="fa fa-trash"></i>remove</button>
                        </div>
                    </div>
                </div>
                <div class="order-body-item"><input type="number" id="${name}" min=0 max=100 /></div>
                <div class="order-body-item"><b>N${price}</b></div>
                <div class="order-body-item subtotal"><b>N${subtotal}</b></div>
            </div> `

            orderList.append(template);
            $(`#${name}`).val(count);
        }

    }
})