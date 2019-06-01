//Listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

// Actual Function to save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

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
    // Prevent form submit 
    e.preventDefault();
    
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
                                           '<h3>'+name+'</h3>'+
                                           '</div>';
    }
}



















