// import { useState } from 'react';
import SearchComponent from '../../UIElements/SearchComponent/SearchComponent';
import { MainTitle } from '../../UIElements/UIElements';
import classes from './MainSideBar.module.scss';
import { colls } from '../../UIElements/Values';
import MainSideBarItem from './MainSideBarItem/MainSideBarItem';
import { AccountCircleOutlined, Brightness4Outlined, HelpOutlineOutlined, NotificationsNoneOutlined, SettingsOutlined, VerticalSplitOutlined } from '@material-ui/icons';

const BottomMenu = () => {
	return (
		<div className={classes.BottomMenu}>
			<div className={classes.BottomMenuItem} >
				<SettingsOutlined />
			</div>
			<div className={classes.BottomMenuItem} >
				<NotificationsNoneOutlined />
			</div>
			<div className={classes.BottomMenuItem} >
				<HelpOutlineOutlined />
			</div>
			<div className={classes.BottomMenuItem} >
				<AccountCircleOutlined />
			</div>
			<div className={classes.BottomMenuSeparator} ></div>
			<div className={classes.BottomMenuSeparator} ></div>
			<div className={classes.BottomMenuSeparator} ></div>
			<div className={classes.BottomMenuItem} >
				<Brightness4Outlined />
			</div>
			<div className={classes.BottomMenuItem} >
				<VerticalSplitOutlined />
			</div>
		</div>
	)
}

const MainSideBar = () => {
	// const [state, setState] = useState({
	// 	closeSideBar: false
	// });


	return (
		<div className={classes.MainSideBar} >
			<MainTitle />
			<SearchComponent />
			<div className={classes.MainSection} >
			{colls && colls.map((item, key) => (
				<MainSideBarItem key={key} item={item} />
			))}
			</div>
			<BottomMenu />
		</div>
	)
}

export default MainSideBar;
