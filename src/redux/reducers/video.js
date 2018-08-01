import {createReducer} from "./createReducer";

const initialState = {
	title: "Test video",
	url: "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
};

export const reducer = createReducer(initialState, {
	['VIDEO_SET']: (state = initialState, action) => action.payload,
});