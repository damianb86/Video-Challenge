import React from 'react';
import {Spin} from 'antd';

const LoadingSpin = (props) =>
	<div className="video-loading" style={{height: props.height}}>
		<Spin size="large" />
	</div>;

export default LoadingSpin;