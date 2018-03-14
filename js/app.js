//Add the car
// const addProducts = document.getElementById('products');

// addCar = () => {
//     e.preventDefaul();

//     if (e.target.classList.contains('add-car')) {
//         const product = e.target.parentElement.parentElement;

//     }
// }

// addProductsCar = (addProducts) => {


// }

const container = document.getElementById('container');
window.addEventListener('load', () => {
    getJson();
})

let data;
getJson = (e) => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=ecologico`)
        .then(response => {
            response.json().then(json => {
                fetch('https://api.mercadolibre.com/sites/MLM/search?q=sustentable').then(response => {
                    response.json().then(Json => {
                        paintDataJson(json, Json);                                     
                    })
                })
            })
        })
        .catch(error => {
            console.log(error);
        });
}

// const data = (json, Json) => {
//     const dataArray = json.results.concat(Json.results);
//     console.log(dataArray);    
//     return dataArray;
// }


paintDataJson = (json, Json) => {
    const products = json.results.concat(Json.results);
    products.forEach(element => {
        let output = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text elements-data">${element.title}</div>
                        <div class="price">$${element.price} mxn</div> 
                        <a href="#modal" data-toggle="modal" class="elements-data" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}"> 
                            <img id="eye" src="assets/images/eye.png" class="elements-data border border-info rounded-circle p-1 mb-1" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">                    
                        </a>
                        <div data-id="${element.id}" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" class="buttonShop">Agregar a carrito</div>                   
                </div>
            `
        container.insertAdjacentHTML('beforeend', output);
    })
    let elementsData = document.getElementsByClassName('elements-data');
    elementEvent(elementsData);

    let buttonAddCart = document.getElementsByClassName('buttonShop');
    converToArray(buttonAddCart);
}

converToArray = (buttonAddCart) => {
    let addItemsId = Array.from(buttonAddCart);
    addItemsId.forEach(item => {
        item.addEventListener('click', chageButtonStatus);
    })

}

chageButtonStatus = (e) => {
    const button = e.target;
    if (button.innerText == 'Agregar a carrito') {
        addCounter();
        addItems(button);
        button.innerText = 'Quitar del carrito';
    } else {
        removeCounter();
        removeItems(button);
        button.innerText = 'Agregar a carrito';
    }
}

const arrayCart = [];

addItems = (button) => {
    const containerCart = document.getElementById('container-cart');

    const objItems ={
        img: button.dataset.img,
        title: button.dataset.title,
        price: button.dataset.price,
        id: button.dataset.id
    }
    
    arrayCart.push(objItems); 

    
    // delete wooooooo
    
    // const indexObj = arrayCart.indexOf(objItems);

    // arrayCart.splice(indexObj, 1);

    // console.log(arrayCart);
       
    
    // let cartTemplate = ``;
    // cartTemplate += `
    //                 <div class="row boxGeneral">
    //                     <div class="col-md-6">
    //                         <div class="imageProduct">
    //                             <img src="${img}" alt="${title}">
    //                         </div>
    //                     </div>
    //                     <div class="col-md-6">
    //                         <div class="titleProduct">${title}</div>
    //                         <div class="priceProduct">Precio Unitario $${price}</div>                                                      
    //                     </div>
    //                 </div>    
    // `;
    // containerCart.insertAdjacentHTML('beforeend', cartTemplate);    
}




removeItems = (button) => {
    // console.log(button);
    // const indexObj = arrayCart.indexOf(objItems);

    // arrayCart.splice(indexObj, 1);

    // console.log(arrayCart);
    
}

addCounter = () => {
    let counterItems = parseInt(document.getElementById('counter-items').innerText);
    let counter = document.getElementById('counter-items');
    counterItems += 1;
    counter.innerHTML = counterItems;
}

removeCounter = () => {
    let counterItems = parseInt(document.getElementById('counter-items').innerText);
    let counter = document.getElementById('counter-items');
    counterItems -= 1
    counter.innerHTML = counterItems;
}

elementEvent = (elementsData) => {
    let elementsEvents = Array.from(elementsData);
    elementsEvents.forEach(button => {
        button.addEventListener('click', getInfo);
    })
}

getInfo = (e) => {
    e.preventDefault();
    const dataSet = e.target.dataset;

    fetch(`https://api.mercadolibre.com//items/${e.target.dataset.id}/description`).then(response => {
        response.json().then(json => {
            const description = json.plain_text;
            paintInfoModal(dataSet, description);
        })
    })
}

paintInfoModal = (dataSet, description) => {
    const containerImg = document.getElementById('image');
    const titleStars = document.getElementById('description-modal');
    const modalBody = document.getElementById('modal-body');

    containerImg.innerHTML = `<img src="${dataSet.img}" alt="${dataSet.title}">`;

    titleStars.innerHTML = `
                        <h5 class="modal-title">${dataSet.title}</h5>
                        <div class="stars">${dataSet.rating}
                            <i class="fas fa-star"></i>                           
                        </div>         
    `;

    modalBody.innerHTML = `
                        <p>Lugar de origen: ${dataSet.state}</p>
                        <p>${description}</p>
                        <div class="priceProduct">$ ${dataSet.price} mxn</div>
    `;

}

showSectionCart = (e) => {
    const containerCart = document.getElementById("container-cart");
    const containerCard = document.getElementById("container-card");
    // console.log(containerCart, containerCard)
    // console.log(containerCart.classList.contains("d-none"))
    if (containerCart.classList.contains("d-none") && containerCard.classList.contains("d-block")) {
        containerCart.classList.remove("d-none");
        containerCard.classList.remove("d-block");
        containerCard.classList.add("d-none");
    };
};

let cart = document.getElementById("image-cart")
cart.addEventListener("click", showSectionCart);