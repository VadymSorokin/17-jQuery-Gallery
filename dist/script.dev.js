"use strict";

var $albumList = $('.album__list');
var $albumPhotos = $('.album__photos');

function init() {
  getAndRenderAlbums();
  getAndRenderPhotos();
  renderAlbumPhotoEventListener();
} // RENDERING


function getAndRenderAlbums() {
  sendGetRequestAlbums().then(function (albums) {
    return createAlbumItem(albums);
  });
}

function renderAlbums($albumItem) {
  $albumList.append($albumItem);
}

function renderPhotos($photo) {
  $albumPhotos.append($photo);
} // REQUESTS


function sendGetRequestAlbums() {
  return fetch('https://jsonplaceholder.typicode.com/albums').then(function (response) {
    return response.json();
  });
}

function getAndRenderPhotos() {
  var albumId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  fetch("https://jsonplaceholder.typicode.com/photos?albumId=".concat(albumId)).then(function (response) {
    return response.json();
  }).then(function (photoList) {
    return createPhotoList(photoList);
  });
} // HTML BASIS


function createAlbumItem(albums) {
  for (var i = 0; i < albums.length; i++) {
    var $albumItem = $("<li data-id-number=\"".concat([i + 1], "\">album ").concat(albums[i].id, ": ").concat(albums[i].title, "</li>"));
    renderAlbums($albumItem);
  }
}

function createPhotoList(photoList) {
  for (var i = 0; i < photoList.length; i++) {
    var $photo = $("<li><img src=\"".concat(photoList[i].url, " alt=\"photo number ").concat(photoList[i].id, "\"></li>"));
    renderPhotos($photo);
  }
}

function clearAlbumPhotos() {
  $albumPhotos.empty();
} // EVENT LISTENER 


function renderAlbumPhotoEventListener() {
  $albumList.click(function (event) {
    clearAlbumPhotos();
    getAndRenderPhotos(event.target.dataset.idNumber);
  });
} //function firstID() {
//	const $firstAlbumId = $('ul.album__list li').first().data('idNumber');
//	console.log($firstAlbumId);
//	return $firstAlbumId;
//}
//firstID()


init();