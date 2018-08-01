import {combineReducers} from "redux";
import * as video from "./reducers/video";
import * as clips from "./reducers/clips";

export default combineReducers({
	video: video.reducer,
	clips: clips.reducer,
});
