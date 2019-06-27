// $('body').append('im working');
$('#submit-city').click(function(e){
    // e.preventDefault();
    // const userInput = $('#city-input').val();
    // // split string into state and city
    // // userinput = 'austin, tx'
    // var inputArray = userInput.split(',');
    // // inputArray[0] = 'austin'
    // // inputArray[1] = ' tx'
    // // loop through array remove any spaces
    // for(let i = 0; i < inputArray.length; i++){
    //     inputArray[i] = inputArray[i].replace(' ', '');
    // }
    

    $.ajax({
        url:`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&types=zoo&key=AIzaSyDSiSgfYZAiH2o18cKrHdoWSdTumTNUqgw`,
    }).then(
        (data) => {
            console.log(data);
        },
        () => {
            console.log("bad request");
        }
    );
})

    
