//Listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

// Actual Function to save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    
    //Validate Form
    if(!validateForm(siteName, siteUrl))
        return false

    //Create Object to be saved in local storage
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    /*
    // Local storage test
    localStorage.setItem('test', 'Sidd');
    console.log(localStorage.getItem('test'));*/

    // Check if bookmark array is available in local storage
    if(localStorage.getItem('bookmarks') === null) {
        // Initialize bookmarks array
        var bookmarks = [];
        // Add bookmark object to array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //fetch from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    // Prevent form submit 
    e.preventDefault();
    fetchBookmarks();
    
}

function deleteBookMark(url) {
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);
    for(var i=0; i< bookmarks.length; i++ )
    {
        if(bookmarks[i].url == url){
            console.log(bookmarks[i].url);
            bookmarks.splice(i, 1);
            break;
        }
    }    
    // Reset bookmarks in locak storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Reload bookmarks
    fetchBookmarks();

    

}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build Output
    bookmarksResults.innerHTML = '';

    for(var i=0; i< bookmarks.length; i++ )
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+
                                           '<h3><a hrer="'+url+'">'+name+'</a>'+
                                           '<div class="pull-right"> <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> '+
                                           ' <a class="btn btn-danger" href="#" onclick="deleteBookMark(\''+url+'\')">Delete</a> </div>'+
                                           '</h3>'+
                                           '</div>';
    }
}

function validateForm(siteName, siteUrl) {
     //validation
     if(!siteName || !siteUrl){
        alert('Site Name or Site URL can not be blank.');
        return false;
    }   
    
    // url validation
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)) {
        alert('Please enter valid site url');
        return false;
    }
    return true;
}



















