import React from 'react';
import {Drawer, Button, Row, Slider, Input, Divider, message} from 'antd';
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";

import VideoPlayer from "../VideoPlayer";
import * as clipsActions from "../../redux/actions/clips";

class VideoClipper extends React.Component{
	state = {
		visible: false,
		childrenDrawer: false,
		duration: 0,
		range: [0,20],
		title: "",
	};

	shouldComponentUpdate(nextProps, nextState){
		return nextProps.video !== this.props.video ||
				!nextState.range.every((value, index) => value === this.state.range[index]) ||
				nextState.visible !== this.state.visible;
	}

	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	onLoadedVideoData = (videoRef) => {
		if ( this.state.duration === 0 )
		{
			this.setState({
				duration: videoRef.current.duration,
				range: [0, Math.max(videoRef.current.duration/2, 1)],
			});
		}
	};

	onInputChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	onSliderChange = (values) => {
		this.setState({
			range: values,
		});
	};

	onSubmit = () => {
		this.props.createClip({
			title: this.state.title,
			start: this.state.range[0],
			end: this.state.range[1],
		});
		message.success("Clip created");
	};

	render(){
		const {
			visible,
			duration,
			range,
		} = this.state;

		const {
			video,
			clip,
			buttonProps,
			buttonText,
		} = this.props;

		return (
			<div>
				<Button
					type="primary"
					onClick={this.showDrawer}
					{...buttonProps}
				>
					{buttonText}
				</Button>
				<Drawer
					title="Clip"
					width={520}
					wrapClassName="test_drawer"
					closable={false}
					onClose={this.onClose}
					visible={visible}
				>
					<Row>
						<VideoPlayer
							video={video}
							clip={{...clip, start: range[0], end: range[1]}}
							withVideoControls={true}
							height={200}
							onLoadedData={this.onLoadedVideoData}
						/>
					</Row>
					<Divider/>
					<Row>
						<Input onChange={this.onInputChange} name="title" placeholder="The clip name" />
					</Row>
					<Row>
						<Slider
							range
							min={0}
							max={duration}
							defaultValue={range}
							tipFormatter={(value) => `${value}s`}
							onAfterChange={this.onSliderChange}
						/>
					</Row>
					<div className="buttons-down">
						<Button
							style={{marginRight: 8}}
							onClick={this.onClose}
						>
							Cancel
						</Button>
						<Button
							onClick={this.onSubmit}
							type="primary"
						>
							Save
						</Button>
					</div>
				</Drawer>
			</div>
		);
	}
}

VideoClipper.propTypes = {
	video: PropTypes.object.isRequired,
	clip: PropTypes.object,
	buttonProps: PropTypes.object,
	buttonText: PropTypes.string,
};

VideoClipper.defaultProps = {
	buttonProps: {},
	buttonText: "New Clip",
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	createClip: (data) => dispatch(clipsActions.create(data)),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(VideoClipper)