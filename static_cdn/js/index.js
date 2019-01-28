$(()=>{
//   creating a slider for the main image display 
    let currentImage = $("#main-display img");
    let imageIndex = 0;

    //main array of the url of images for the main-display
    let mainDisplayImages = [];

    //function for image exchange
    const changeImage = ()=>{
        if(imageIndex >= mainDisplayImages.length){
            imageIndex = 0;
        }

        currentImage.animate({opacity: 0}, 1000, "linear", ()=>{
            currentImage[0].src = mainDisplayImages[imageIndex];
            currentImage = $(currentImage[0]);
        })
        
        .animate({opacity: 1}, 400, "linear", ()=>{
            imageIndex++;    
        });
    }
    $.get('products/queryset/', (data)=>{
        let urls = JSON.parse(data);

        for(imageUrl of urls.products){
            if(imageUrl){
                mainDisplayImages.push(imageUrl);
            }
        }

        mainDisplayImages.push(currentImage[0].src);

        let imageChanger = setInterval(changeImage, 2000);

        currentImage.on("mouseover", ()=>{
            clearInterval(imageChanger);
        })
        currentImage.on("mouseout", ()=>{
            imageChanger = setInterval(changeImage, 3000);
        })
    });
   
})