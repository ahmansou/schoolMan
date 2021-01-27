import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import { colls } from '../../../UIElements/Values';
import classes from './MainSideBarItem.module.scss';

const HotLink = (props, activeOnlyWhenExact) => {
	const link = props.link;
	let match = useRouteMatch({
		path: props.to,
		exact: activeOnlyWhenExact
	});

	let itemClass = [classes.ItemItem].join(' ');
	let itemClassDirect = [classes.MainSideBarItemToggle].join(' ');
	
	if (match) {
		itemClass = [classes.ItemItem, classes.ItemItemActive].join(' ');
		itemClassDirect = [classes.MainSideBarItemToggle, classes.MainSideBarItemActive].join(' ');
	}
	
	useEffect(() => {
		if (match && link.type !== 'direct')
			props.setShow();
	}, [])

	return (
		<Aux>
		{
			link.type === 'direct' ?
			<Link className={itemClassDirect} to={link.to} >
				<p>{link.icon}</p>
				<p className={classes.ItemTitle} >{link.title}</p>
			</Link>
			:
			<Link className={itemClass} to={link.to} >{link.name}</Link>
		}
		</Aux>
	)
}

const MainSideBarItem = (props) => {
	const item =  props.item;
	const [state, setState] = useState({
		showItems: false,
		active: false
	});
	
	
	useEffect(() => {
		if (state.active) {
			setState({...state, showItems: true});
			let newStates = [...props.state.itemStates];
			newStates[props.index].state = true;
			for (let i = 0; i < colls.length; i++)
				if (i !== props.index)
					newStates[i].state = false;
			props.setState({...props.state, itemStates: newStates});
		}
	}, [state.active]);

	const menuHandler = () => {
		setState({...state, showItems: !state.showItems});
		let newStates = [...props.state.itemStates];
		for (let i = 0; i < colls.length; i++)
			if (i !== props.index)
				newStates[i].state = false;
		newStates[props.index].state = !newStates[props.index].state;
		props.setState({...props.state, itemStates: newStates});
	}
	
	console.log('itemstate: ', props.state.itemStates[props.index]);

	let menuClass = classes.MainSideBarItemMenu;
	let toggleActive = classes.MainSideBarItemToggle;
	if (props.state.itemStates[props.index].state) {
		menuClass = [classes.MainSideBarItemMenu, classes.MainSideBarItemMenuOpen].join(' ');
	}
	if (state.active) {
		toggleActive = [classes.MainSideBarItemToggle, classes.MainSideBarItemToggleActive].join(' ');
	}
	

	return (
		<div className={classes.MainSideBarItem} >
		{
		item.type === 'toggle' ?
			<Aux>
			<div className={toggleActive} onClick={menuHandler}>
				<p>{item.icon}</p>
				<p className={classes.ItemTitle} >{item.title}</p>
				{item.type === 'toggle' ? 
					props.state.itemStates[props.index].state ? 
					<KeyboardArrowUpOutlined className={classes.ToggleArrow} /> 
					:
					<KeyboardArrowDownOutlined className={classes.ToggleArrow} /> 
					
				: null}
			</div>
			<div className={menuClass}>
			{item.items && item.items.map((link, key) => (
				<HotLink to={link.to} link={link} key={key} setShow={() => setState({...state, active: true})} />
			))}
			</div>
		</Aux> 
		: item.type === 'direct' ?
			<HotLink  to={item.to} link={item} />
		: null
		}
		</div>
	)
}

export default MainSideBarItem;