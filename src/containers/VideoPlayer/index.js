import React from 'react';
import {Card, Divider, Button, Icon} from 'antd';
import PropTypes from "prop-types";
import LoadingSpin from "../../components/LoadingSpin";

class VideoPlayer extends React.Component{
	state = {
		sleeping: true,  // Fix browser update video URL
	};

	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentWillMount(){
		this.awake();
	}

	componentWillReceiveProps(){
		this.setState({ sleeping: true });
		this.awake();
	}

	awake = () => {
		setTimeout(() => this.setState({ sleeping: false }), 500);
	};

	playVideo = () => {
		this.videoRef.current.play();
	};

	pauseVideo = () => {
		this.videoRef.current.pause();
	};

	nextVideo = () => {
		this.videoRef.current.pause();
	};

	prevVideo = () => {
		this.videoRef.current.pause();
	};

	render(){
		const {
			sleeping,
		} = this.state;

		const {
			video,
			clip,
			withVideoControls,
			height,
		} = this.props;

		return (
			<Card
				hoverable
				cover={ sleeping
					? <div style={{height: height+20}}>
						<LoadingSpin height={height}/>
					  </div>

					: <div style={{height: height+20}}>
						<video height={height} ref={this.videoRef} controls={withVideoControls} onLoadedData={() => this.props.onLoadedData(this.videoRef)}>
							<source src={video.url + (clip.start && clip.end ? `#t=${clip.start},${clip.end}` : '')} />
						</video>
						<Divider />
						{ !withVideoControls
							? <Button.Group style={{width: "100%", textAlign: "center"}}>
								<Button type="primary" size="large" onClick={this.playVideo}>
									<Icon type="caret-right"/>
								</Button>
								<Button type="primary" size="large" onClick={this.pauseVideo}>
									<Icon type="pause"/>
								</Button>
							  </Button.Group>

							: ""
						}
				      </div>
				}
			>
				<Card.Meta
					title={clip.title}
					description={clip.start !== undefined && clip.end !== undefined ? `${clip.start}s - ${clip.end}s` : "Full video"}
				/>
			</Card>
		);
	}
}

VideoPlayer.propTypes = {
	video: PropTypes.object.isRequired,
	clip: PropTypes.object.isRequired,
	withVideoControls: PropTypes.bool,
	height: PropTypes.number,
	onLoadedData: PropTypes.func,
};

VideoPlayer.defaultProps = {
	withVideoControls: true,
	height: 400,
	onLoadedData: () => {},
};

export default VideoPlayer;