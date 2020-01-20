var app = {  
	initialize: function() { 
		this.bindEvents(); 
	},  
	 
	bindEvents: function() {
		var takePhoto = document.getElementById('StartButton');  
		takePhoto.addEventListener('click', app.takePhoto, false); 
		var Exit = document.getElementById('Exit');  
		Exit.addEventListener('click', app.Exit, false); 
		var help = document.getElementById('Info');  
		help.addEventListener('click', app.Info, false); 
		var Close = document.getElementById('Close');  
		Close.addEventListener('click', app.Close, false);
		document.addEventListener("backbutton", app.Exit, false);
	},

	Info: function(){
		var about = document.getElementById('about');
		about.style.display = 'block';  
	},
	
	Close: function(){
		var about = document.getElementById('about');
		about.style.display = 'none';
	},
	
	Exit: function(){
		navigator.app.exitApp();
	}, 
	
	takePhoto: function() {
		// First check if the user has internet
		if(app.checkConnection()) {
			navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 50,
			allowEdit: true, destinationType: navigator.camera.DestinationType.FILE_URI });
		} else {
			alert("You need a valid network connection to use this application. Please turn in on and try again.");
		}
	},

	checkConnection: function() {
    	var networkState = navigator.connection.type;

    	if(networkState == Connection.NONE) {
    		return false;
    	} else {
    		return true;
    	}
	},
  
	onPhotoDataSuccess: function(imageData) {
		window.location.href = "TextConversion.html?ImageData="+encodeURIComponent(imageData);
	},
  
	onFail: function(message) {
		// Failed
	}    
};