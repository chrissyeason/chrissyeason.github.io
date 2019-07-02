// $('body').append('im working');
$('.carouselSlides').carousel({
    interval: 2000
});
$('#submit-city').click(function(e){
    e.preventDefault();
    let breweryList = $(`#breweryList`);
    breweryList.empty();
    const userInput = $('#city-input').val();
    // split string into state and city
    // userinput = 'austin, tx'
    var inputArray = userInput.split(',');
    // inputArray[0] = 'austin'
    // inputArray[1] = ' tx'
    // loop through array remove any spaces
    for(let i = 0; i < inputArray.length; i++){
        inputArray[i] = inputArray[i].replace(' ', '');
    }
    

    $.ajax({
        url: `https://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&adminDistrict=${inputArray[1]}&locality=${inputArray[0]}&key=AsNSrJ9nxY0hH82Hft6W7lSFK5zKER34LGJ3hYm70N6buBQXYlVneYV22zyYVLjL`,
    }).then(
        (data) => {
            // finds lat and long for userInput
            const searchCoordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
            $.ajax({
                //url: `https://cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2/search/geo/point?lat=30.267589569091797&lng=-97.74298858642578&radius=25&key=68855133f4391d6efa6f4d8fcf1b7674`,
                url: `https://cors-anywhere.herokuapp.com/https://www.brewerydb.com/browse/map/get-breweries?lat=${searchCoordinates[0]}&lng=${searchCoordinates[1]}&radius=15`
            }).then(
                (data) => {
                    // parse string into object
                    let dataInfo = JSON.parse(data);
            
                    for(let i = 0; i < dataInfo.data.length; i++){
                        // console.log(dataInfo.data[i]);
                        // save info for dataInfo.data[i] in a variable
                        const breweryName = dataInfo.data[i].brewery.name;
                        // set breweryImage to null and only set to image if image exists
                        let breweryImage = null;
                        if(dataInfo.data[i].brewery.hasOwnProperty('images')){
                            breweryImage = dataInfo.data[i].brewery.images.squareLarge;
                        }
                        let breweryWebsite = null;
                        if(dataInfo.data[i].brewery.hasOwnProperty('website')){
                            breweryWebsite = dataInfo.data[i].brewery.website;
                        }
                        let breweryAddress = null;
                        if(dataInfo.data[i].hasOwnProperty('streetAddress')){
                            breweryAddress = dataInfo.data[i].streetAddress;
                        }
                        // create var link that is href
                        const link = $(`<a href="#">${breweryName}</a>`);
                        // save variables to link
                        link.data({"breweryWebsite": breweryWebsite, 
                                    "breweryName": breweryName,
                                    "breweryImage": breweryImage,
                                    "breweryAddress": breweryAddress});

                        const li = $(`<li>`);
                        li.append(link);
                        
                        // append breweryName to ul of column1-names-list
                        $('#column1-names-list ul').append(li);
                        $(li).addClass('list-group-item');
                        
                        
                        link.click(function(e) {
                            let storage = $(this).data();
                            let brewInfo = $('#brewery-info-large');
                            brewInfo.empty();
                            brewInfo.addClass('breweryDescriptions');
                            // if statement says if images property is present append img
                            if(storage.breweryImage !== null){
                                brewInfo.append(`<img src="${storage.breweryImage}">`);
                            }
                            brewInfo.append(`<h2>${storage.breweryName}</h2>`);

                            if(storage.breweryWebsite !== null){
                                brewInfo.append(`<a href="${storage.breweryWebsite}">${storage.breweryWebsite}</a>`);
                            }
                            if(storage.breweryAddress !== null){
                                brewInfo.append(`<p>${storage.breweryAddress}<p>`);
                            }
                            // append favorite brewery to favorites list
                            let favoriteButton = $('<button class="btn"><i class="fas fa-heart"></i></button>');
                            brewInfo.append(favoriteButton);
                            favoriteButton.click(function(e){
                                // check favorite list and see if breweryWebsite already exhists
                                // append link to favorite column
                                let favoritesList = $(`#favorites ul`);
                                
                                    favoritesList.append(`<li><a href="${storage.breweryWebsite}">${storage.breweryName}</a></li>`);
                                
                                
                                // open new window when clicked 
                            });
                        });
                    
                    }
                    
                },
                () => {
                    console.log('bad request');
                }
            )
        },
        () => {
            console.log("bad request");
        }
    );
})


// function storageAvailable(type) {
//     let storage;
//     try {
//         storage = window[type];
//         var x = '__storage_test__';
//         storage.setItem(x, x);
//         storage.removeItem(x);
//         return true;
//     }
//     catch(e) {
//         return e instanceof DOMException && (
//             // everything except Firefox
//             e.code === 22 ||
//             // Firefox
//             e.code === 1014 ||
//             // test name field too, because code might not be present
//             // everything except Firefox
//             e.name === 'QuotaExceededError' ||
//             // Firefox
//             e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             (storage && storage.length !== 0);
//     }
// }
// if (storageAvailable('localStorage')) {
//     console.log("Yippee! We can use localStorage awesomeness");
//   }
//   else {
//     console.log("Too bad, no localStorage for us");
//   }

// // The Storage.getItem() method is used to get a data item from storage; 
// // in this case, we are testing to see whether the key item exists; 
// // if not, we run populateStorage() to add the existing customization values 
// // to the storage. If there are already values there, we run a function() 
// // to update the page styling with the stored values.
  
//   if(!localStorage.getItem('favoritesList')) {
//     populateStorage();
//   } else {
//     addFavorites();
//   }
  
// function populateStorage(){
//     let favoriteItem = $('#favorites li')
//     // key is variable, value is 
//     localStorage.setItem()
// }
// function addFavorites(){
//     // update the page styling with the stored values
//     let favoritesList = $(`#favorites ul`);
//     console.log(favoritesList);
//     // let currentFavorite = localStorage.getItem(favoriteList);
// }


// // store list locally on browser
// localStorage.favoritesList = 'favoritesList';


    
