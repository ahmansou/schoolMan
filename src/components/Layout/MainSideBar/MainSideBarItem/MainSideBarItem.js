import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import { Context } from '../../../../hooks/Store';
import { colls } from '../../../UIElements/Values';
import classes from './MainSideBarItem.module.scss';

const HotLink = (props, activeOnlyWhenExact) => {
	const [state, dispatch] = useContext(Context);
	const [hovered, setHovered] = useState(false);
	
	const link = props.link;
	let match = useRouteMatch({
		path: props.to,
		exact: activeOnlyWhenExact
	});
	
	useEffect(() => {
		if (match && props.type !== 'blank')
			props.setShow();
		
	}, [state.accent]);

	let itemStyle = {
		color: match ? state.accent.activeText : state.accent.textColor,
		backgroundColor: 
			match ? 
				hovered ? 
					state.accent.activeHover : state.accent.active
			: !match ? 
				hovered ? 
					state.accent.darker : null
			: null
	}

	return (
		<Aux>
		{
			props.type === 'direct' ?
			<Link className={classes.MainSideBarItemToggle} to={link.to}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={itemStyle} >
				<p>{link.icon}</p>
				<p className={classes.ItemTitle} >{link.title}</p>
			</Link>
			:
			<Link className={classes.ItemItem} to={link.to} onClick={props.setShow}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={itemStyle} >
				{link.name}</Link>
		}
		</Aux>
	)
}

const MainSideBarItem = (props) => {
	const [state, dispatch] = useContext(Context);
	const [backgroundColor, setBackgroundColor] = useState(undefined);
	const [backgroundColorDarker, setbackgroundColorDarker] = useState(undefined);
	const item =  props.item;
	const [itemState, setitemState] = useState({
		showItems: false,
		active: false
	});
	
	
	useEffect(() => {
		if (itemState.active) {
			setitemState({...itemState, showItems: true});
			let newStates = [...props.state.itemStates];
			for (let i = 0; i < colls.length; i++)
			if (i !== props.index)
				newStates[i].state = false;
			newStates[props.index].state = true;
			props.setState({...props.state, itemStates: newStates});
		}
	}, [itemState.active]);

	const menuHandler = () => {
		setitemState({...itemState, showItems: !itemState.showItems});
		let newStates = [...props.state.itemStates];
		for (let i = 0; i < colls.length; i++)
			if (i !== props.index)
				newStates[i].state = false;
		newStates[props.index].state = !newStates[props.index].state;
		props.setState({...props.state, itemStates: newStates});
	}

	let menuClass = classes.MainSideBarItemMenu;
	let toggleActive = classes.MainSideBarItemToggle;
	
	if (props.state.itemStates[props.index].state)
		menuClass = [classes.MainSideBarItemMenu, classes.MainSideBarItemMenuOpen].join(' ');

	return (
		<div className={classes.MainSideBarItem} >
		{
		item.type === 'toggle' ?
		<Aux>
			<div className={toggleActive} onClick={menuHandler} 
				onMouseEnter={() => setBackgroundColor(state.accent.darker)}
				onMouseLeave={() => setBackgroundColor(undefined)}
				style={{
				backgroundColor: backgroundColor,
				color:state.accent.textColor}} >
				<p>{item.icon}</p>
				<p className={classes.ItemTitle} >{item.title}</p>
				{item.type === 'toggle' ? 
					props.state.itemStates[props.index].state ? 
					<KeyboardArrowUpOutlined className={classes.ToggleArrow}
					onMouseEnter={() => setbackgroundColorDarker(state.accent.darkerSecondary)}
					onMouseLeave={() => setbackgroundColorDarker(undefined)}
					style={{backgroundColor: backgroundColorDarker}} /> 
					:
					<KeyboardArrowDownOutlined className={classes.ToggleArrow}
					onMouseEnter={() => setbackgroundColorDarker(state.accent.darkerSecondary)}
					onMouseLeave={() => setbackgroundColorDarker(undefined)}
					style={{backgroundColor: backgroundColorDarker}} /> 
					
				: null}
			</div>
			<div className={menuClass}>
			{item.items && item.items.map((link, key) => (
				<HotLink itemState={props.state.itemStates[props.index].state} to={link.to} link={link} key={key} 
				type={item.type}
				setShow={() => setitemState({...itemState, active: true})} 
				setHide={() => setitemState({...itemState, active: false})} 
				/>
			))}
			</div>
		</Aux> 
		: item.type === 'direct' ?
			<HotLink to={item.to} link={item} setShow={() => setitemState({...itemState, active: true})} type='direct'/>
		: null
		}
		</div>
	)
}

export default MainSideBarItem;
