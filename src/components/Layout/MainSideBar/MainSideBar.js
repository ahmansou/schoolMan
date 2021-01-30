import { useState } from 'react';
import SearchComponent from '../../UIElements/SearchComponent/SearchComponent';
import { MainTitle } from '../../UIElements/UIElements';
import classes from './MainSideBar.module.scss';
import { colls } from '../../UIElements/Values';
import MainSideBarItem from './MainSideBarItem/MainSideBarItem';
import { AccountCircleOutlined, Brightness4Outlined, Dashboard, HelpOutlineOutlined, NotificationsNoneOutlined, Search, SettingsOutlined, VerticalSplitOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';

const BottomMenuItem = (props) =>  {
	return (
		<Aux>
			{
			props.onClick ?
			<div className={classes.BottomMenuItem} onClick={props.onClick} >
				<p className={classes.HoverInfo} >{props.hover}</p>
				{props.children}
			</div>
			:
			<div className={classes.BottomMenuItem} >
				<p className={classes.HoverInfo} >{props.hover}</p>
				<Link to={props.to} >{props.children}</Link>
			</div>
			}
		</Aux>
	)
}

const BottomMenu = (props) => {
	return (
		<div className={classes.BottomMenu}>
			<BottomMenuItem to='/settings' hover='Settings' >
				<SettingsOutlined />
			</BottomMenuItem>
			<BottomMenuItem to='/notificaitons' hover='Notification' >
				<NotificationsNoneOutlined />
			</BottomMenuItem>
			<BottomMenuItem to='/help' hover='Help' >
				<HelpOutlineOutlined />
			</BottomMenuItem>
			<BottomMenuItem to='/account' hover='My Account' >
				<AccountCircleOutlined />
			</BottomMenuItem>
			<div className={classes.BottomMenuSeparator} ></div>
			<div className={classes.BottomMenuSeparator} ></div>
			<div className={classes.BottomMenuSeparator} ></div>
			<BottomMenuItem hover='Dark Mode' >
				<Brightness4Outlined />
			</BottomMenuItem>
			<BottomMenuItem onClick={props.closeSideBar} hover='Collapse' >
				<VerticalSplitOutlined />
			</BottomMenuItem>
		</div>
	)
}

const MainSideBar = () => {
	let itemState = [];
	for (let i = 0; i < colls.length; i++)
		itemState.push({state: false, title :colls[i].title, active: false})

	const [state, setState] = useState({
		closeSideBar: false,
		itemStates: itemState
	});

	let mainClass = classes.MainSideBar;
	let mainSection = classes.MainSection;
	let mainSectionMini = classes.MainSectionMiniHidden;
	
	if (state.closeSideBar) {
		mainClass = [classes.MainSideBar, classes.MainSideBarClosed].join(' ');
		mainSection = [classes.MainSection, classes.MainSectionClosed].join(' ');
		mainSectionMini = classes.MainSectionMini;
	}

	return (
		<div className={mainClass} >
			<div className={classes.TitleSection} >
				<MainTitle />
				<SearchComponent />
			</div>
			<div className={mainSection} >
			{colls && colls.map((item, index) => (
				<MainSideBarItem 
					closeSideBar={state.closeSideBar} 
					index={index} 
					state={state} 
					setState={setState}  
					item={item} />
			))}
			</div>
			<div className={mainSectionMini}>
				<div className={classes.MainSectionMiniItem} >
					<Dashboard />
				</div>
				<div className={classes.MainSectionMiniItem} >
					<Search />
				</div>
			{colls && colls.map((item, index) => (
				item.type !== 'blank' ?
				<div className={classes.MainSectionMiniItem} 
					style={state.itemStates[index].state === true ? {backgroundColor: '#fae3d0', color: '#9e693e'} : null} >
					{item.icon}
				</div> : null
			))}
			</div>
			<BottomMenu closeSideBar={() => setState({...state, closeSideBar: !state.closeSideBar})} />
		</div>
	)
}

export default MainSideBar;
