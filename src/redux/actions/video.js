export const set = video =>
	dispatch =>
		dispatch({
			type: 'VIDEO_SET',
			payload: video
		});