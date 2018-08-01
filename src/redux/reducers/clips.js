import {createReducer} from "./createReducer";

const initialState = [{
	key: 'original',
	title: "Full Video"
},{
	key: 'randonmKey',
	title: "Test clip",
	start: 15,
	end: 27
}];

export const reducer = createReducer(initialState, {
	['CLIP_CREATE']: (state = initialState, action) => state.concat( action.payload ),
	['CLIP_REMOVE']: (state = initialState, action) => state.filter( item => item.key !== action.payload ),
});