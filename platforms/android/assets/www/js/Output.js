var app3 = {

	type: null,
	value: null,

	initialize: function() {
		this.loadTranslation();
		this.bindEvents();
		this.loadData();
	},

	loadTranslation: function(){
		if(this.getParameter("TranslationData")) {
			var data = this.getParameter("TranslationData");
			var parsedResponse = JSON.parse(data);
			app3.type = parsedResponse.type;
			app3.value = parsedResponse.value;
		} else {
			console.log("nothing");
		}
	},   
	 
	bindEvents: function() {
		var Exit = document.getElementById('Exit');  
		Exit.addEventListener('click', app3.ExitApp, false); 
		var Back = document.getElementById('Back');  
		Back.addEventListener('click', app3.Back, false);
		var Home = document.getElementById('Home');  
		Home.addEventListener('click', app3.BackToStart, false);
	},

	loadData: function() {
		if(app3.type === "text") {
			var text = document.getElementById('text');
			text.style.cssText = "display:block";
			text.innerHTML = app3.value;
		} else if(app3.type === "audio") {
			var audio = document.getElementById('audio');
			audio.style.cssText = "display:block";
	        audio.src = app3.value;
	        audio.load();
	        audio.play();
		} else {
			var lgp = document.getElementById('lgp');
			lgp.style.cssText = "display:block";

			lgp.src = "http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test8_voiceclip_mp4_480x320.mp4";
	        lgp.load();
	        lgp.play();
		}
	},

	BackToStart: function() {
		window.location.replace("index.html");
	},

	ExitApp: function(){
		navigator.app.exitApp();
	},
	
	Back: function(){
		navigator.app.backHistory();
	},
	
	getParameter: function(theParameter) { 
		var params = window.location.search.substr(1).split('&');

		for (var i = 0; i < params.length; i++) {
			var p=params[i].split('=');
			if (p[0] == theParameter) {
			  return decodeURIComponent(p[1]);
			}
		}
		return false;
	}
}; 