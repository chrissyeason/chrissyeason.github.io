// $('body').append('im working');
$('.carouselSlides').carousel({
    interval: 2000
});
$('#submit-city').click(function(e){
    e.preventDefault();
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
                        console.log(dataInfo.data[i]);
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
                            let favoriteButton = $('<button class="btn"><i class="fas fa-heart"></i></button>');
                            brewInfo.append(favoriteButton);
                            // click heart and append breweryName to favorite list
                        });

                        // click on li and replace carousel with li info
                        // console.log(dataInfo.data[i]);
                        
                        // console.log(dataInfo.data[i].brewery.name);
                        // brewery.images.squareMedium is brewery's logo good large logo
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






    
