//self-execting anonymous function
(function () {
    
 //class like object   
    var Jukebox = function(playlistRef, positionRef, SC){
        
        //stores a reference to an object
        var me = this;
        
        this.currentlyPlayingSound;
        this.currentlyPlayingIndex;
        this.position = $(positionRef);
        this.playlist = $(playlistRef);
        console.log(this.playlist);
        this.sc = SC;
        
        
//respond to a click on any list item in playlist
this.playlist.on("click", "li", function(event) {
    
    var clickedElement = $(event.target);
    //update what is currently playing
    me.currentlyPlayingIndex = clickedElement.index();
    
    //get the associated track of the clicked element
    var trackID = clickedElement.data("trackID");
    
    //show the track title for "now playing"
    $("#txtNow").html(clickedElement.html());
    
    //play the selected song
    me.playSong(trackID);
});
        
    }
    
   //play next song
    Jukebox.prototype.playNext = function(){
        //try to play next song
    this.currentlyPlayingIndex ++;
    
    //make sure there is a next song to play
    if(this.currentlyPlayingIndex < this.playlist.children().length ) {
        var nextElement = this.playlist.find('li').eq(this.currentlyPlayingIndex);
        
        //update the now playing HTML
        $("#txtNow").html("Now playing: " + nextElement.html() );

        //play the next song
        this.playSong(nextElement.data("trackID"));
    }
    }
    
    
    
    //play a song
    Jukebox.prototype.playSong = function playSong(trackID) {
        
        //stores a reference to an object
        var me = this;
    
    //make sure this sound exists
    if(me.currentlyPlayingSound) {
        //if it does, stop it
        me.currentlyPlayingSound.stop();
    }
    
    SC.stream("/tracks/"+trackID, function(sound){
      
this.currentlyPlayingSound = sound;

sound.play({
whileplaying: function() {
    me.position.val(sound.position / sound.duration);
},
onfinish: function () {
    me.playNext()
    
}

});
});
}
    
    //stop currently playing song
    Jukebox.prototype.stop = function() {
     if(this.currentlyPlayingSound) {
            currentlyPlayingSound.stop();
    }
    }
    
    $("#btnStop").click(function() {
        if(currentlyPlayingSound) {
            currentlyPlayingSound.stop();
            //this.currentlyPlayingSound = sound;
            //$('#position').val(0);
            currentlyPlayingSound.position = 0;
            $('#position').val(currentlyPlayingSound.position / currentlyPlayingSound.duration);
            //this.position.val(0 / sound.duration);
        }
    });
    
       $("#btnPlay").click(function() {
        if(currentlyPlayingSound) {
            currentlyPlayingSound.play();
        }
    });
    
    
       $("#btnPause").click(function() {
        if(currentlyPlayingSound) {
            currentlyPlayingSound.pause();
        }
    });
    
    
    //play next song
    $("#btnNext").click(function() {
         if(currentlyPlayingSound) {
            currentlyPlayingSound.stop();
            //this.currentlyPlayingSound = sound;
            //$('#position').val(0);
            currentlyPlayingSound.position = 0;
            $('#position').val(currentlyPlayingSound.position / currentlyPlayingSound.duration);
            //this.position.val(0 / sound.duration);
        }
        this.currentlyPlayingIndex ++;
    
    //make sure there is a next song to play
    if(this.currentlyPlayingIndex < this.playlist.children().length ) {
        var nextElement = this.playlist.find('li').eq(this.currentlyPlayingIndex);
        
        //update the now playing HTML
        $("#txtNow").html("Now playing: " + nextElement.html() );

        //play the next song
        this.playSong(nextElement.data("trackID"));
    }
    });
    
    //export jukebox for everybody to use
    window.Jukebox = Jukebox;
    
    
      
})()