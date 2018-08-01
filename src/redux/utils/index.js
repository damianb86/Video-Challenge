import {db, storage} from "../../firebase";
import {message} from "antd/lib/index";
import moment from "moment/moment";

export const filterUndefined = data => {
	Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : "");
	return data;
};

export const firebaseToArray = data =>
	data ?
		Object.keys(data).map(key => ({
			id: key,
			...data[key],
		}))
		: [];

export const firebaseSaveImage = (file, id, MODEL) => {
	let fileName = `${MODEL}/images/${id}_${file.name}`;

	db.ref(MODEL).child(id).update({image: fileName});
	storage.ref().child(fileName).put(file);

	return fileName;
};

export const firebaseGetImages = (MODEL, data) =>
	new Promise((resolve, reject) => {
		let promises = [];
		data.forEach((item, key) => {
			let imageField = item.image ? "image" : "logo";
			if (item[imageField] && item[imageField].indexOf("https://") === -1) {
				/*let promise = storage.ref().child(item[imageField]).getDownloadURL().then( url =>
					data[key] = {
						...data[key],
						[imageField]: url
					}
				);

				promises.push(promise);*/
				let uri = item[imageField].split("\/").join("%2F");
				promises.push(new Promise(resolve => resolve({
					...data[key],
					[imageField]: `https://firebasestorage.googleapis.com/v0/b/deliveryme-5daf2.appspot.com/o/${uri}?alt=media`,
				})));

			} else {
				promises.push(new Promise(resolve => resolve(item)));
			}
		});

		resolve(Promise.all(promises));
	});

export const getFirebaseModel = (MODEL, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).on("value",
			snapshot => {
				let data = firebaseToArray(snapshot.val());

				dispatch({
					type: `RECEIVE_${MODEL}`,
					payload: data,
				});

				resolve(data);
			},
			error => {
				message.error(error.message);
				reject(error);
			},
		),
	);

export const getFirebaseModelWithImage = (MODEL, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).on("value",
			snapshot => {
				let data = firebaseToArray(snapshot.val());

				firebaseGetImages(MODEL, data, dispatch).then(items => {
					dispatch({
						type: `RECEIVE_${MODEL}`,
						payload: items,
					});

					resolve(items);
				});
			},
			error => {
				message.error(error.message);
				reject(error);
			},
		),
	);

export const getFirebaseModelFiltered = (MODEL, filter, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).orderByChild(filter.field).equalTo(filter.value).on("value",
			snapshot => {
				let data = firebaseToArray(snapshot.val());

				dispatch({
					type: `RECEIVE_${MODEL}`,
					payload: data,
				});

				resolve(data);
			},
			error => {
				message.error(error.message);
				reject(error);
			},
		),
	);

export const getFirebaseModelFilteredWithImage = (MODEL, filter, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).orderByChild(filter.field).equalTo(filter.value).on("value",
			snapshot => {
				let data = firebaseToArray(snapshot.val());

				firebaseGetImages(MODEL, data, dispatch).then(items => {
					dispatch({
						type: `RECEIVE_${MODEL}`,
						payload: items,
					});

					resolve(items);
				});
			},
			error => {
				message.error(error.message);
				reject(error);
			},
		),
	);

export const createFirebaseModel = (MODEL, data, image, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).push({
			...filterUndefined(data),
			createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
		}).once("value", snapshot => {
			if (image && image.file)
				firebaseSaveImage(image.file, snapshot.key, MODEL);

			dispatch({
				type: `CREATED_${MODEL}`,
				payload: data,
			});

			resolve(data);
		}),
	);

export const createFirebaseModelWithId = (MODEL, id, data, image, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).child(id).set({
			...filterUndefined(data),
			createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
		}).then(data =>
			resolve(data),
		),
	);

export const updateFirebaseModel = (MODEL, id, data, image, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).child(id).update({
			...filterUndefined(data),
			updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
		}).then(data => {
			if (image && image.file)
				firebaseSaveImage(image.file, id, MODEL);

			dispatch({
				type: `UPDATED_${MODEL}`,
				payload: data,
			});
			resolve(data);
		}),
	);

export const removeFirebaseModel = (MODEL, id, dispatch) =>
	new Promise((resolve, reject) =>
		db.ref(MODEL).child(id).remove().then(data => {
			//storage.ref().child(fileName).put(file);  ToDo: Delete image

			dispatch({
				type: `DELETED_${MODEL}`,
				payload: data,
			});
			resolve(data);
		}),
	);

export const assignToTree = (tree, items) => {
	items.forEach( (item, index) => {
		if ( tree[item.parent] ){
			tree[item.parent].children[item.id] = {
				...item,
				children: {}
			};
			items.slice(index, 1);
		}
	});

	Object.keys(tree).forEach( key => {
		assignToTree( tree[key].children, items );
	});
};
