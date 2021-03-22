const $albumList = $('.album__list');
const $albumPhotos = $('.album__photos');

function init() {
	getAndRenderAlbums();
	getAndRenderPhotos();
	renderAlbumPhotoEventListener();
}

// RENDERING

function getAndRenderAlbums() {
	sendGetRequestAlbums()
		.then((albums) => createAlbumItem(albums))
}
function renderAlbums($albumItem) {
	$albumList.append($albumItem);
}
function renderPhotos($photo) {
	$albumPhotos.append($photo);
}

// REQUESTS

function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function getAndRenderPhotos(albumId = 1) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(albumId)}`)
		.then((response) => response.json())
		.then((photoList) => createPhotoList(photoList))
}

// HTML BASIS

function createAlbumItem(albums) {
	for (let i = 0; i < albums.length; i++) {
		const $albumItem = $(`<li data-id-number="${[i + 1]}">album ${albums[i].id}: ${albums[i].title}</li>`);
		renderAlbums($albumItem);
	}
}

function createPhotoList(photoList) {
	for (let i = 0; i < photoList.length; i++) {
		const $photo = $(`<li><img src="${photoList[i].url} alt="photo number ${photoList[i].id}"></li>`);
		renderPhotos($photo);
	}
}

function clearAlbumPhotos() {
	$albumPhotos.empty();
}

// EVENT LISTENER 

function renderAlbumPhotoEventListener() {
	$albumList.click((event) => {
		clearAlbumPhotos();
		getAndRenderPhotos(event.target.dataset.idNumber);
	})
}

//function firstID() {
//	const $firstAlbumId = $('ul.album__list li').first().data('idNumber');
//	console.log($firstAlbumId);
//	return $firstAlbumId;
//}
//firstID()
init()