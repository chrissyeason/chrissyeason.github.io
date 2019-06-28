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
        url: `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&adminDistrict=${inputArray[1]}&locality=${inputArray[0]}&key=AsNSrJ9nxY0hH82Hft6W7lSFK5zKER34LGJ3hYm70N6buBQXYlVneYV22zyYVLjL`,
        // url:`https://api.brewerydb.com/v2/&key=68855133f4391d6efa6f4d8fcf1b7674`
        // ,
    }).then(
        (data) => {
            const searchCoordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
        },
        () => {
            console.log("bad request");
        }
    );
})





    
