// $('body').append('im working');
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
            const searchCoordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
            $.ajax({
                //url: `https://cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2/search/geo/point?lat=30.267589569091797&lng=-97.74298858642578&radius=25&key=68855133f4391d6efa6f4d8fcf1b7674`,
                url: 'https://cors-anywhere.herokuapp.com/https://www.brewerydb.com/browse/map/get-breweries?lat=30.267153&lng=-97.74306079999997&radius=25&search=austin%2C+tx'
            }).then(
                (data) => {
                    console.log(data);
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





    
