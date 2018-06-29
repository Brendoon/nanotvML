//# sourceURL=application.js

//
//  application.js
//  nanotvML
//
//  Created by Brendoon Ryos on 23/06/2018.
//  Copyright © 2018 Brendoon Ryos. All rights reserved.
//

var baseURL;
 
function loadingTemplate() {
    var loadingDoc = "<document><loadingTemplate><activityIndicator><text>Loading ...</text></activityIndicator></loadingTemplate></document>";
    var parser = new DOMParser();
    var parsedTemplate = parser.parseFromString(loadingDoc, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}

function getDocument(extension) {
    console.log("Buscando documento: " + extension);
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    console.log("Buscando documento [url]: " + url);
 
    loadingTemplate();
    templateXHR.responseType = "document";
    templateXHR.open("GET", url, true);
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML);}, false);
    templateXHR.send();
}

function pushPage(document) {
    var currentDoc = getActiveDocument();
    if (currentDoc.getElementsByTagName("loadingTemplate").item(0) == null) {
        console.log("no loading");
        navigationDocument.pushDocument(document);
    } else {
        navigationDocument.replaceDocument(document, currentDoc);
        console.log("loading");
    }
}

function loadImage(extension) {
    return baseURL + extension
}
 
App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    loadingTemplate();
    var templateURL = "templates/main.tvml";
    getDocument(templateURL);
}

function playMediaExternal(videourl, mediaType) {
    var singleVideo = new MediaItem(mediaType, videourl);
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}

function playMedia(extension, mediaType) {
    var videourl = baseURL + extension;
    var singleVideo = new MediaItem(mediaType, videourl);
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}

App.onExit = function() {
    console.log("exited");
}
