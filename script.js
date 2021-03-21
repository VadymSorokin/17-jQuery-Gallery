const $albumList = $('.album__list');
const $albumPhotos = $('.album__photos');

function init() {
	renderFirstAlbumPhotos();
	getAndRenderAlbums();
	renderAlbumPhotoEventListener();
}
init()

// RENDERING

function getAndRenderAlbums() {
	sendGetRequestAlbums()
		.then((albums) => createAlbumItem(albums))
}
function renderAlbums($albumItem) {
	$albumList.append($albumItem);
}

function renderFirstAlbumPhotos() {
	sendGetRequestAlbums()
		.then((response) => getAndRenderPhotos(response[0].id))
}

function renderPhotos($photo) {
	$albumPhotos.append($photo);
}

// REQUESTS

function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function getAndRenderPhotos(albumId) {
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