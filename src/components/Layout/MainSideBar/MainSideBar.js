import { useContext, useState } from 'react';
import SearchComponent from '../../UIElements/SearchComponent/SearchComponent';
import { MainTitle } from '../../UIElements/UIElements';
import classes from './MainSideBar.module.scss';
import { accents, colls } from '../../UIElements/Values';
import MainSideBarItem from './MainSideBarItem/MainSideBarItem';
import { AccountCircleOutlined, Brightness4Outlined, Dashboard, HelpOutlineOutlined, NotificationsNoneOutlined, Search, SettingsOutlined, VerticalSplitOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import { Context } from '../../../hooks/Store';

const BottomMenuItem = (props) =>  {
	const [state, dispatch] = useContext(Context);
	const [hovered, setHovered] = useState(false);

	let itemStyle = {
		color: state.accent.textColor,
		backgroundColor: hovered ? state.accent.darker : null
	}

	return (
		<Aux>
			{
			props.onClick ?
			<div className={classes.BottomMenuItem} onClick={props.onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)} style={itemStyle} >
				<div className={classes.HoverInfo} style={{
					backgroundColor: state.accent.hoverInfo,
					color: state.accent.hoverInfoText,
			}} ><div style={{borderTopColor: state.accent.hoverInfo}} ></div>{props.hover}</div>
				{props.children}
			</div>
			:
			<div className={classes.BottomMenuItem} 
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)} style={itemStyle} >
				<div className={classes.HoverInfo} style={{
					backgroundColor: state.accent.hoverInfo,
					color: state.accent.hoverInfoText,
				}} ><div style={{borderTopColor: state.accent.hoverInfo}} ></div>{props.hover}</div>
				<Link to={props.to} style={{color: state.accent.textColor}} >{props.children}</Link>
			</div>
			}
		</Aux>
	)
}

const BottomMenu = (props) => {
	const [state, dispatch] = useContext(Context);

	const DarkModeHandeler = () => {
		if (state.accent.name === 'dark') {
			dispatch({type: 'SET_ACCENT', payload: accents.light});
			localStorage.setItem('schoolManColorAccent', JSON.stringify({
				accent: accents.light
			}));
		}
		else {
			localStorage.setItem('schoolManColorAccent', JSON.stringify({
				accent: accents.dark
			}));
			dispatch({type: 'SET_ACCENT', payload: accents.dark});
		}
		
	}

	return (
		<div className={classes.BottomMenu} style={{
			backgroundColor: state.accent.primary,
			borderColor: state.accent.outlines,
			color: state.accent.textColor,
			
		}} >
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
			<BottomMenuItem hover='Dark Mode' onClick={DarkModeHandeler} >
				<Brightness4Outlined />
			</BottomMenuItem>
			<BottomMenuItem onClick={props.closeSideBar} hover='Collapse' >
				<VerticalSplitOutlined />
			</BottomMenuItem>
		</div>
	)
}

const MainSideBar = () => {

	const [state, dispatch] = useContext(Context);
	
	let itemState = [];
	for (let i = 0; i < colls.length; i++)
		itemState.push({state: false, title :colls[i].title, active: false})

	const [sidebarState, setsidebarState] = useState({
		closeSideBar: false,
		itemStates: itemState
	});

	let mainClass = classes.MainSideBar;
	let mainSection = classes.MainSection;
	let mainSectionMini = classes.MainSectionMiniHidden;
	
	if (sidebarState.closeSideBar) {
		mainClass = [classes.MainSideBar, classes.MainSideBarClosed].join(' ');
		mainSection = [classes.MainSection, classes.MainSectionClosed].join(' ');
		mainSectionMini = classes.MainSectionMini;
	}

	return (
		<div className={mainClass} style={{
			backgroundColor: state.accent.primary,
			borderColor: state.accent.outlines,
			color: state.accent.textColor,
		}} >
			<div className={classes.TitleSection} >
				<MainTitle />
				<SearchComponent />
			</div>
			<div className={mainSection} >
			{colls && colls.map((item, index) => (
				<MainSideBarItem 
					closeSideBar={sidebarState.closeSideBar} 
					index={index} 
					state={sidebarState} 
					setState={setsidebarState}  
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
					style={
						sidebarState.itemStates[index].state === true ? {
							backgroundColor: state.accent.active, 
							color: state.accent.activeText} : null} >
					{item.icon}
				</div> : null
			))}
			</div>
			<BottomMenu closeSideBar={() => setsidebarState({...sidebarState, closeSideBar: !sidebarState.closeSideBar})} />
		</div>
	)
}

export default MainSideBar;
