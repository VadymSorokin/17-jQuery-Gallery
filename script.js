const albumList = $('.album__list');
const albumPhotos = $('.album__photos');

function init() {
	renderAlbums();
	renderPhotos();
	renderAlbumPhotoEventListener();
}
init()

function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function renderAlbums() {
	sendGetRequestAlbums()
		.then((album) => {
			for (let i = 0; i < album.length; i++) {
				const albumItem = `<li data-id-number="${[i + 1]}">album ${album[i].id}: ${album[i].title}</li>`;
				albumList.append(albumItem);
			}
		})
}

function getFirstAlbumId() {
	return sendGetRequestAlbums()
		.then((response) => renderPhotos(response[0].id))
}

function renderPhotos(albumId = getFirstAlbumId()) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(albumId)}`)
		.then((response) => response.json())
		.then((photoList) => {
			for (let i = 0; i < photoList.length; i++) {
				const photo = `<li><img src="${photoList[i].url} alt="photo number ${photoList[i].id} from album ${albumId}"></li>`;
				albumPhotos.append(photo);
			}
		})
}

function renderAlbumPhotoEventListener() {
	albumList.click((event) => {
		const albumId = event.target.dataset.idNumber;
		clearAlbum();
		renderPhotos(albumId);
	})
}

function clearAlbum() {
	albumPhotos.empty();
}