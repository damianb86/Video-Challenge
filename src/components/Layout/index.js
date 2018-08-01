import React from 'react';
import {Layout} from 'antd';

import "antd/dist/antd.css";

const AppLayout = (props) =>
	<Layout className="layout">
		<Layout.Sider style={{ background: '#fff' }}>
			{props.sider}

		</Layout.Sider>
		<Layout.Content style={{ padding: '0 50px' }}>
			<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
				{props.children}
			</div>
		</Layout.Content>
	</Layout>;

export default AppLayout;