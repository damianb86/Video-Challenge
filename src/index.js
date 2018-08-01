import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import registerServiceWorker from "./registerServiceWorker";
import Root from "./Root";
import reducer from "./redux";
import "./index.css";

const store = createStore(
	reducer,
	composeWithDevTools(
	),
);

ReactDOM.render(
	<Root store={store}/>,
	document.getElementById("root"),
);

registerServiceWorker();