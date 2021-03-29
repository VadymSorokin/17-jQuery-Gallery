const $albumList = $('.album__list');
const $albumPhotos = $('.album__photos');

//REQUESTS
function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function getAndRenderAlbums() {
	sendGetRequestAlbums()
		.then((albums) => createAlbumsAndRenderFirstAlbumPhotos(albums));
}

function getAndRenderPhotos(albumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(albumId)}`)
		.then((response) => response.json())
		.then((photoList) => createPhotoList(photoList))
}
//RENDERING
function renderAlbums($albumItem) {
	$albumList.append($albumItem);
}

function renderPhotos($photo) {
	$albumPhotos.append($photo);
}
//LOGIC
function createAlbumsAndRenderFirstAlbumPhotos(albums) {
	for (let i = 0; i < albums.length; i++) {
		const $albumItem = $(`<li data-id-number="${[i + 1]}">album ${albums[i].id}: ${albums[i].title}</li>`);
		renderAlbums($albumItem);
	}
	getAndRenderPhotos(albums[0].id)
}

function createPhotoList(photoList) {
	for (let i = 0; i < photoList.length; i++) {
		const $photo = $(`<li><img src="${photoList[i].url}" alt="${photoList[i].title}" data-album-id="${photoList[i].albumId}"></li>`);
		renderPhotos($photo);
	}
}

function clearAlbumPhotos() {
	$albumPhotos.empty();
}
//EVENT LISTENER
function renderAlbumPhotoEventListener() {
	$albumList.click((event) => {
		clearAlbumPhotos();
		getAndRenderPhotos(event.target.dataset.idNumber);
	})
}
//INIT
function init() {
	getAndRenderAlbums();
	renderAlbumPhotoEventListener();
}
init()