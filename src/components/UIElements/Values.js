import { SupervisorAccount, SupervisedUserCircle, RecentActors, Class, Assignment, AirportShuttle, LocalLibrary, Home, SettingsOutlined} from '@material-ui/icons';

export const colls = [
	{title: 'Home', type: 'direct', icon: <Home />, to: '/'},
	{title: 'Students and Parents', type: 'toggle', items: [
		{name: 'All students', to: '/students'},
		{name: 'All parents', to: '/parents'},
	], icon: <SupervisorAccount />},
	{title: 'Personel', type: 'toggle', items: [
		{name: 'All staffs', to: '/staffs'},
		{name: 'Other personel', to: '/personels'},
		{name: 'Personel types', to: '/personel-types'},
	], icon: <SupervisedUserCircle />},
	{title: 'Classes', type: 'toggle', items: [
		{name: 'All classes', to: '/classes'},
		{name: 'All groups', to: '/groups'},
	], icon: <Class />},
	{title: 'Subjects & Exams', type: 'toggle', items: [
		{name: 'All subjects', to: '/subjects'},
		{name: 'All exams', to: '/exams'},
	], icon: <Assignment />},
	{title: 'Library', type: 'toggle', items: [
		{name: 'All books', to: '/books'},
		{name: 'Lending history', to: '/lend-history'},
	], icon: <LocalLibrary />},
	{title: 'Logistics', type: 'toggle', items: [
		{name: 'All vehicles', to: '/vehicles'},
		{name: 'All routes', to: '/routes'},
		{name: 'All sites', to: '/sites'},
	], icon: <AirportShuttle />},
	// {title: 'Users', type: 'toggle', items: [
	// 	{name: 'All users', to: '/users'},
	// 	// {name: 'Add new user', to: '/new-user'},
	// ], icon: <RecentActors />},
	{title: 'Users', type: 'direct', icon: <RecentActors />, to: '/users'},
	{title: '', type: 'blank'},
]

export const classArray = [
	{value: 'SM', name: 'SM'},
	{value: 'PC', name: 'PC'},
	{value: 'SVT', name: 'SVT'}
];

export const groupArray =  [
	{value: 'SM1', name: 'SM1'},
	{value: 'SM2', name: 'SM2'},
	{value: 'SM3', name: 'SM3'},
	{value: 'SM4', name: 'SM4'},
	{value: 'PC1', name: 'PC1'},
	{value: 'PC2', name: 'PC2'},
	{value: 'PC3', name: 'PC3'},
	{value: 'SVT1', name: 'SVT1'},
	{value: 'SVT2', name: 'SVT2'}
]

export const gender = [
	{name: 'Female', value: 'F'},
	{name: 'Male', value: 'M'}
]

export const accents = {
	light : {
		name: 'light',
		primary: '#FFFFFF',
		darker: '#f4f5f8',
		darkerSecondary: '#dedfe2',
		secondary: '#F0F1F3',
		active: '#FAE3D0',
		activeHover: '#F8D2B2',
		activeText: '#9e693e',
		outlines: '#dbdbdb',
		textColor: 'black',
		textColorSecondary: '#6A737D',
		hoverInfo: '#000000',
		hoverInfoText: '#FFFFFF',
		// success: '',
	},
	dark : {
		name: 'dark',
		primary: '#151E28',
		darker: '#0E141B',
		darkerSecondary: '#000000',
		secondary: '#0F151C',
		active: '#1B263B',
		activeHover: '#2D3F62',
		activeText: '#FFFFFF',
		outlines: '#070A0D',
		textColor: '#FFFFFF',
		textColorSecondary: '#6A737D',
		hoverInfo: '#4A5159',
		hoverInfoText: '#FFFFFF',
		// success: '',
	},
	// accent1 : {
	// 	name: 'accent1',
	// 	primary: '#FFFFFF',
	// 	darker: '#fbefef',
	// 	secondary: '#B5838D',
	// 	outlines: '#F3CECF',
	// 	textColor: '#DE7C80',
	// 	textColorSecondary: '#8B949E',
	// 	hoverInfo: '#F3CECF',
	// 	hoverInfoText: '#DE7C80',
	// 	// success: '',
	// },
	// accent2 : {
	// 	name: 'accent2',
	// 	primary: '#FFFFFF',
	// 	darker: '#CAF0F8',
	// 	secondary: '#0096C7',
	// 	outlines: '#90E0EF',
	// 	textColor: '#00B4D8',
	// 	textColorSecondary: '#8B949E',
	// 	hoverInfo: '#CAF0F8',
	// 	hoverInfoText: '#0096C7',
	// 	// success: '',
	// },
}