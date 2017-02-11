function getRandomString() {
    $.get("/string", function(string) {
        $('#user_name').val(string);
        console.log('New data is: ' + string);
    });
}

function functionOne() { alert('You clicked the top text'); }
