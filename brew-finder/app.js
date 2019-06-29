// $('body').append('im working');
$('.carouselSlides').carousel();
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
                    let dataInfo = JSON.parse(data);
                    const mainName = dataInfo.data[0].brewery.name;
                    const mainPhoto = dataInfo.data[0].brewery.images.squareMedium;
                    console.log(mainPhoto);
                    
                    // CAROUSEL INFO AND PHOTOS
                    $('body').append(mainName);
                    $('#main-brewery-photo').append(`<img src="https://brewerydb-images.s3.amazonaws.com/brewery/JxLZ8H/upload_DmVKPl-squareMedium.png">`)
                    

                    for(let i = 0; i < dataInfo.data.length; i++){
                        // console.log(dataInfo.data[i]);
                        // save info for dataInfo.data[0] in a variable
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






    
