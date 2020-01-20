var app2 = {

	lat: null,
	lon: null,

	initialize: function() {
		this.loadImage();		
		this.bindEvents();  
	},  
	 
	bindEvents: function() {
		var BoxText = document.getElementById('Text');  
		BoxText.addEventListener('click', app2.TextConvert, false); 
		var Audio = document.getElementById('Audio');  
		Audio.addEventListener('click', app2.AudioConvert, false); 
		var Gestual = document.getElementById('Gestual');  
		Gestual.addEventListener('click', app2.GestualConvert, false); 
		var Exit = document.getElementById('Exit');  
		Exit.addEventListener('click', app2.ExitApp, false); 
		var Back = document.getElementById('Back');  
		Back.addEventListener('click', app2.Back, false);

		// First of all request the coordinates
		app2.Cord();
	},	
	
	TextConvert: function(){
		app2.MakeRequest("text");
	},  
	
	AudioConvert: function(){
		app2.MakeRequest("audio");
	},  
	
	GestualConvert: function(){
		app2.MakeRequest("lgp");
	},

	MakeRequest: function(type) {
		// Get the text to translate
		var textToTranslate = document.getElementById("textBox").value;

		// If there is no text, deny the translation
		if(textToTranslate === "") {
			alert("You must have a text to translate");
			return;
		}

		var xmlHttp = null;
		var requestUrl = "http://95.215.63.31:88/webservices/figureout/?comand=traduz&palavra=" + textToTranslate + app2.GetLanguages() + "&formato=audio" + type + app2.GetCoordinates();
		console.log(requestUrl);
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", requestUrl, false);
		xmlHttp.send(null);
		console.log(xmlHttp.responseText);
		var responseText = xmlHttp.responseText.replace(/[]+/g, "");
		responseText = responseText.replace("]", "");
		
		// Remove all square brackets
		while(responseText.indexOf('[') != -1 || responseText.indexOf(']') != -1) {
			responseText = responseText.replace("[", "").replace("]", "");
		}

		// Replace the \u0026
		responseText = responseText.replace("\\u0026", "&");
		responseText = responseText.replace("%E2%80%9D", "");

		// Read first part of response (request status code) - for now both parts are equal
		responseText = responseText.substring(responseText.indexOf("{"), responseText.indexOf("}") + 1);;

		var parsedResponse = JSON.parse(responseText);
		console.log(parsedResponse);

		var data;
		if(type === "text") {
			console.log(parsedResponse.palavra_traduzida);
			data = parsedResponse.palavra_traduzida;
		} else if(type === "audio") {
			data = parsedResponse.audio_link;
		} else {
			data = parsedResponse.LGP_extra;
		}

		var transData = {
    		"type": type,
    		"value": data
    	};
    	var translationJson = JSON.stringify(transData);
		window.location.href = "Output.html?TranslationData=" + encodeURIComponent(translationJson);
	},

	GetLanguages: function() {
		// Get the source language
		var source = document.getElementById("sourceLanguage");
		var sourceLanguage = source.options[source.selectedIndex].value;

		console.log(sourceLanguage);

		// Get the destiny language
		var dest = document.getElementById("destLanguage");
		var destLanguage = dest.options[dest.selectedIndex].value;

		console.log(destLanguage);

		return "&idioma=" + sourceLanguage + "&idioma_destino=" + destLanguage;
	},

	GetCoordinates: function() {
		return "&lat=" + app2.lat + "&lon=" + app2.lon;
	},
	
	ExitApp: function(){
		navigator.app.exitApp();
	},
	
	Back: function(){
		//navigator.app.backHistory();
		history.go(-1);
	},
	
	Cord: function(){
		navigator.geolocation.getCurrentPosition(app2.onSuccess, app2.onError);
	},  
	
	onError: function(error) {
		app2.lat = 0;
		app2.lon = 0;
	},
	
	onSuccess: function(position) {
		app2.lat = position.coords.latitue;
		app2.lon = position.coords.longitude;
	},
	
	loadImage: function(){
		var photo = document.getElementById('Foto');
		//photo.style.display = 'block';
		
		if(this.getParameter("ImageData")) {
			photo.src = this.getParameter("ImageData");	
		}
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