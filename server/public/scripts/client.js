console.log('client JS has been loaded');

$(document).ready(function(){
    console.log('JQ loaded');
    $('#addShoes').on('click', addShoes);
    getShoes();        
    $('#shoeList').on('click', '.saveButton', editShoe);
    $('#shoeList').on('click', '.deleteButton', removeShoe);    
});//end document ready

function getShoes(){
    console.log('in getShoes');
    $.ajax({
        url: '/shoes',
        type: 'GET',
        success: function (response){
            console.log('got some shoes', response);
            $('#shoeList').empty();
            for (var i = 0; i < response.length; i++){
                var shoe = response[i];
                var $newShoeItem = $('<li>' + shoe.name + '</li>');

                var $newShoeName = $('<input class="newShoeName" type="text" placeholder="Enter name">');
                $newShoeItem.append($newShoeName);

                //create and append the save button
                var $saveShoeButton = $('<button class="saveButton">Save</button>');
                $newShoeItem.append($saveShoeButton);                
                $saveShoeButton.data('id', shoe.id);

                //create and append the delete button
                var $deleteShoeButton = $('<button class="deleteButton">Delete</button>');
                $deleteShoeButton.data('id', shoe.id);
                $newShoeItem.append($deleteShoeButton);
                
                //append the new list item to the DOM
                $('#shoeList').append($newShoeItem);
            }
        }
    })
}

function addShoes(){
    $.ajax({  //including this in document ready is not a common practice, just for this demo
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function(response){
            console.log('response', response);
            getShoes();
            
        }
    })
}

function removeShoe(){
    console.log($(this).data());
    var shoeIdToRemove = $(this).data().id;
    console.log('remove shoe was clicked! The shoe id was ', shoeIdToRemove);

    $.ajax ({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function(response){
            getShoes();
        }
    })
}

function editShoe(){
    console.log($(this).data()); // this should love {id:7} or whatever id is  
    var shoeIdToSave = $(this).data().id;
    var shoeNameToSave = $(this).parent().children(".newShoeName").val();
    console.log('save shoe was clicked! The shoe id was ', shoeIdToSave);

    $.ajax({
        method: 'PUT',
        url: '/shoes/' + shoeIdToSave,
        data: {
            name: shoeNameToSave,
        },
        success: function (response) {
            getShoes();
        }
    })
}