import { SupervisorAccount, SupervisedUserCircle, RecentActors, Class, Assignment, AirportShuttle, LocalLibrary, Home} from '@material-ui/icons';

export const colls = [
	{title: 'Home', type: 'direct', icon: <Home />, to: '/'},
	{title: 'Students', type: 'toggle', items: [
		{name: 'All students', to: '/students'},
		{name: 'Add new student', to: '/new-student'},
		{name: 'All parents', to: '/parents'},
		{name: 'Add new parent', to: '/new-parent'},
	], icon: <SupervisorAccount />},
	{title: 'Personel', type: 'toggle', items: [
		{name: 'All staffs', to: '/staffs'},
		{name: 'Add new staff', to: '/new-staff'},
		{name: 'Other personel', to: '/personels'},
		{name: 'Add new personel', to: '/new-personel'},
		{name: 'Personel types', to: '/personel-types'},
	], icon: <SupervisedUserCircle />},
	{title: 'Classes', type: 'toggle', items: [
		{name: 'All classes', to: '/classes'},
		{name: 'Add new classe', to: '/new-classe'},
		{name: 'All groups', to: '/groups'},
		// {name: 'Add new group', to: '/new-group'},
	], icon: <Class />},
	{title: 'Subjects & Exams', type: 'toggle', items: [
		{name: 'All subjects', to: '/subjects'},
		{name: 'Add new subject', to: '/new-subject'},
		{name: 'All exams', to: '/exams'},
		{name: 'Add new exam', to: '/new-exam'},
	], icon: <Assignment />},
	{title: 'Library', type: 'toggle', items: [
		{name: 'All books', to: '/books'},
		{name: 'Add new book', to: '/new-book'},
		{name: 'Lending history', to: '/lend-history'},
	], icon: <LocalLibrary />},
	{title: 'Logistics', type: 'toggle', items: [
		{name: 'All vehicles', to: '/vehicles'},
		{name: 'Add new vehicle', to: '/new-vehicle'},
		{name: 'All routes', to: '/routes'},
		{name: 'Add new route', to: '/new-route'},
		{name: 'All sites', to: '/sites'},
		{name: 'Add new site', to: '/new-site'},
	], icon: <AirportShuttle />},
	{title: 'Users', type: 'toggle', items: [
		{name: 'All users', to: '/users'},
		{name: 'Add new user', to: '/new-user'},
	], icon: <RecentActors />},
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