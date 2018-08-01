import React from "react";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import {Route, HashRouter, Switch} from "react-router-dom";

import * as routes from './constants/routes';
import Clips from "./containers/Clips";

const Root = ({store}) => (
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Clips}/>
				<Route exact path={routes.VIDEO_CLIPS} component={Clips}/>
			</Switch>
		</HashRouter>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired,
};

export default Root;