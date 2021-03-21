"use strict";

var $albumList = $('.album__list');
var $albumPhotos = $('.album__photos');

function init() {
  renderFirstAlbumPhotos();
  getAndRenderAlbums();
  renderAlbumPhotoEventListener();
}

init(); // RENDERING

function getAndRenderAlbums() {
  sendGetRequestAlbums().then(function (albums) {
    return createAlbumItem(albums);
  });
}

function renderAlbums($albumItem) {
  $albumList.append($albumItem);
}

function renderFirstAlbumPhotos() {
  sendGetRequestAlbums().then(function (response) {
    return getAndRenderPhotos(response[0].id);
  });
}

function renderPhotos($photo) {
  $albumPhotos.append($photo);
} // REQUESTS


function sendGetRequestAlbums() {
  return fetch('https://jsonplaceholder.typicode.com/albums').then(function (response) {
    return response.json();
  });
}

function getAndRenderPhotos(albumId) {
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
}