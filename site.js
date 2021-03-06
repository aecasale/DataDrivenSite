var trackListing = $("#trackListing");
var playlist = $("#playlist");
var position = $("#position");
var result;
var currentlyPlayingSound;
var currentlyPlayingIndex;

SC.initialize({
    client_id: "a1e72144ff5d13f14e044a4197e360e5",
    redirect_url: "http://127.0.0.1"
});

//makes a new jukebox
var jukebox = new Jukebox("#playlist", "#position", SC)

$("#btnStop").click(function() {
    jukebox.stop();
})

//when the search button is clicked...
$("#btnSearch").click(function() {
    //get the search value
    var searchValue = $("#txtSearch").val();
    
    //list the songs of that value
    listSongs(searchValue);
});

$("#playlist").on("click", "img", function(event) {
    
    var clickedElement = $(event.target);
    
    //update what is currently playing
    var removeIndex = clickedElement.data('index');
    
    $('#playlist .' + removeIndex).remove();

});

//respond to a click on a list item in track listing
//for ANY LIST ITEM regardless of when it was added
$("#trackListing").on("click", "img", function(event) { 
    var clickedElement = $(event.target);
    
    //get index of the index of the data associated with clicked element
    var selectorIndex = clickedElement.data('index');
    
    var associatedTrack = $('#' + selectorIndex);
    
    //get index of the index of the data associated with clicked element 
    var arrayIndex = associatedTrack.data('index');
    
    //get the extra data from the result array
    var associatedData = result[arrayIndex];
    
    //make a clone //its the same but double
    var clonedElement = associatedTrack.clone();
    
    //add some extra data to the cloned element
    //in specific, the trackID to ply whenever this item
    //is clicked
    clonedElement.data("trackID", associatedData.id );
    
    //add the track title to our playlist div
    playlist.append( clonedElement );
    
    playlist.append("<img src='assets/Remove.png' data-index='"+clickedElement.data('index')+"' class='" + clickedElement.data('index') + "' id='" + clickedElement.data('index') + "' />");
    
    
    
});

//lists songs for us
function listSongs(query) {
    SC.get("/tracks", { limit: 10, q: query }, function(tracks) {
        //store result for later
        result = tracks;
        
        //clear out track listing
        trackListing.empty();
        
        //populate new values
        for(var i in tracks) {
            var curTrack = tracks[i];
            
            trackListing.append(
                "<li class='"+i+"' id='"+i+"' data-index='"+i+"'>"+curTrack.title+"</li><img src='assets/Add.png' data-index='"+i+"' />"
            );
        }
    });
}

