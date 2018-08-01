import React from 'react';
import {Link} from 'react-router-dom';
import {List, Avatar, Button, Popconfirm} from 'antd';

import * as routes from "../../constants/routes";
import VideoClipper from "../../containers/VideoClipper";

const VideoList = (props) =>
	<List
		itemLayout="horizontal"
		dataSource={props.videos}
		renderItem={item => (
			<List.Item style={{marginLeft: 20}}>
				<List.Item.Meta
					avatar={<Link to={routes.VIDEO_CLIPS.replace(':clip', item.key)}><Avatar icon="play-circle" /></Link>}
					title={item.title}
					description={item.start !== undefined && item.end !== undefined ? `${item.start}s - ${item.end}s` : "Full video"}
				/>
				{ item.key !== 'original'
					? <div>
						<Popconfirm
							title="Remove the clip?"
							okText="Yes"
							cancelText="No"
							onConfirm={() => props.removeClip(item)}
						>
							<Button size="small" type="danger" icon="delete"/>
						</Popconfirm>
					  </div>

					: ""
				}

			</List.Item>
		)}
	/>;

export default VideoList;