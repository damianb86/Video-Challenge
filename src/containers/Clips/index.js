import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Row, Button} from 'antd';

import AppLayout from '../../components/Layout';
import VideoPlayer from "../VideoPlayer";
import VideoClipper from "../VideoClipper";
import VideoList from "../../components/VideoList";
import * as clipsActions from "../../redux/actions/clips";

class Clips extends React.Component {
	state = {
		clipSelected: {}
	};

	componentWillMount(){
		this.selectClip(this.props);
	}

	componentWillReceiveProps(newProps){
		this.selectClip(newProps);
	}

	selectClip = (props) => {
		let {
			match,
			clips,
		} = props;

		this.setState({
			clipSelected: match.params.clip && clips.find( clip => clip.key === match.params.clip ) ? clips.find( clip => clip.key === match.params.clip ) : clips[0]
		});
	};

	render(){
		const {
			video,
			clips,
		} = this.props;

		const {
			clipSelected,
		} = this.state;


		return (
			<AppLayout
				sider={
					<div>
						<VideoList
							video={video}
							videos={clips ? clips : []}
							removeClip={this.props.removeClip}
						/>
						<div className="buttons-down">
							<VideoClipper
								video={video}
								clip={clips[0]}
							/>
						</div>
					</div>
				}
			>
				<Row>
					<VideoPlayer
						video={video}
						clip={clipSelected}
						withVideoControls={false}
					/>
				</Row>

			</AppLayout>
		);
	}
}

const mapStateToProps = state => ({
	video: state.video,
	clips: state.clips,
});

const mapDispatchToProps = dispatch => ({
	removeClip: (clip) => dispatch(clipsActions.remove(clip)),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(Clips)