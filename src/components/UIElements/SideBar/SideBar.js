import React, { Component, useState, useEffect } from 'react';
import classes from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import { Close, ArrowDropDown, ArrowDropUp, School} from '@material-ui/icons';
import { BackDrop } from '../UIElements';
import { colls } from '../Values';

const SideBarItem = (props) => {
	const [show, setShow] = useState(false)

	let cls = [classes.SideBarMainItemBody]
	if (show)
		cls.push(classes.SideBarMainItemBodyOpen)
	else
		cls.push(classes.SideBarMainItemBodyClosed)
	
	if (props.sideBarClosed)
		cls.push(classes.SideBarMainItemBodyHover)

	return (
		<div className={classes.SideBarItem} >
			{props.sideBarClosed && (props.coll.type === 'toggle' || props.coll.type === 'link')
			? <div className={classes.Tooltiptext}>{props.coll.title}</div> : null }
			{
			props.coll.type === 'toggle' ? 
			<div className={classes.SideBarMainItemToggle} 
				onClick={() => setShow(!show)} 
				>
				{props.children}
				<p>{!props.sideBarClosed ? props.coll.title : null}</p>
				{
				show ? 
				<p className={classes.Arrow}><ArrowDropUp /></p>
				:
				<p className={classes.Arrow}><ArrowDropDown /></p>
				}
			</div>
			: props.coll.type === 'link' ? 
			<Link className={classes.SideBarMainItemToggle} to={'/'+props.coll.to}>
				{props.children}
				<p>{!props.sideBarClosed ? props.coll.title : null}</p>
			</Link>
			: <div className={classes.SideBarMainItemBlank} ></div>}
			{ props.sideBarClosed && show ? <BackDrop onClick={() => setShow(!show)} /> : null }
			<div className={cls.join(' ')} >
			{props.coll.items && props.coll.items.map((item, key) => {
				return <Link 
					className={classes.SideBarMainItemLink} 
					key={key} to={'/'+item.to} >+ {item.name}</Link>
			})}
			</div>
		</div>
	)
}

class SideBar extends Component {
	state = {
		sideBarClosed: true 
	}

	render () {
		let cls = [classes.SideBar];

		if (this.state.sideBarClosed)
			cls.push(classes.SideBarClosed);
		else
			cls.push(classes.SideBarOpen);

		return (
			<div className={cls.join(' ')} >
				<div className={classes.SideBarTitle} >
					{
					this.state.sideBarClosed === false ? 
					<Aux>
						<Link to="/" className={classes.SideBarTitleItem} >
							<School />
							<h4>SchlMan</h4>
						</Link>
						<div className={classes.SideBarClose} 
							onClick={() => this.setState({sideBarClosed: true})} >
							<Close />
						</div>
					</Aux>
					: 
					<div className={classes.SideBarShow} 
						onClick={() => this.setState({sideBarClosed: false})} >
						<School />
					</div>
					}
				</div>
				<div className={classes.SideBarMain} >
				{colls.map((coll, key) => (
					<SideBarItem 
						sideBarClosed={this.state.sideBarClosed} 
						key={key} 
						coll={coll}>{coll.icon}</SideBarItem>
				))}
				</div>
			</div>
		)
	}
}

export default SideBar;