export const create = (clip) =>
	({
		type: 'CLIP_CREATE',
		payload: {
			...clip,
			key: Math.random().toString(36).substring(2)
		}
	});

export const remove = (clip) =>
	({
		type: 'CLIP_REMOVE',
		payload: clip.key
	});

export const update = (clip) =>
	({
		type: 'CLIP_UPDATE',
		payload: clip
	});