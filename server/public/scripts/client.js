console.log('client JS has been loaded');

$(document).ready(function(){
    console.log('JQ loaded');
    $.ajax({  //including this in document ready is not a common practice, just for this demo
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function(response){
            console.log('response', response);
            
        }
    })
});