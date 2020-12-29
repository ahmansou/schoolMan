import { Close, Dashboard, SupervisorAccount, PeopleAlt, ArrowDropDown, ArrowDropUp, SupervisedUserCircle, Settings, RecentActors, Class, Subject, Assignment, AirportShuttle, Domain, LocalLibrary, School} from '@material-ui/icons';

export const colls = [
	{title: 'Students', type: 'toggle', items: [
		{name: 'All students', to: 'students'},
		{name: 'Add new student', to: 'new-student'},
	], icon: <SupervisorAccount />},
	{title: 'Parents', type: 'toggle', items: [
		{name: 'All parents', to: 'parents'},
		{name: 'Add new parent', to: 'new-parent'},
	], icon: <PeopleAlt />},
	{title: 'Personel', type: 'toggle', items: [
		{name: 'All staffs', to: 'staffs'},
		{name: 'Add new staff', to: 'new-staff'},
		{name: 'Other personel', to: 'personels'},
		{name: 'Add new personel', to: 'new-personel'},
		{name: 'Personel types', to: 'personel-types'},
	], icon: <SupervisedUserCircle />},
	{title: 'Classes', type: 'toggle', items: [
		{name: 'All classes', to: 'classes'},
		{name: 'Add new classe', to: 'new-classe'},
	], icon: <Class />},
	{title: 'Subjects', type: 'toggle', items: [
		{name: 'All subjects', to: 'subjects'},
		{name: 'Add new subject', to: 'new-subject'},
	], icon: <Subject />},
	{title: 'Exams', type: 'toggle', items: [
		{name: 'All exams', to: 'exams'},
		{name: 'Add new exam', to: 'new-exam'},
	], icon: <Assignment />},
	{title: 'Library', type: 'toggle', items: [
		{name: 'All books', to: 'books'},
		{name: 'Add new book', to: 'new-book'},
		{name: 'Lending history', to: 'lend-history'},
	], icon: <LocalLibrary />},
	{title: 'Logistics', type: 'toggle', items: [
		{name: 'All vehicles', to: 'vehicles'},
		{name: 'Add new vehicle', to: 'new-vehicle'},
		{name: 'All routes', to: 'routes'},
		{name: 'Add new route', to: 'new-route'},
	], icon: <AirportShuttle />},
	{title: 'Sites', type: 'toggle', items: [
		{name: 'All sites', to: 'sites'},
		{name: 'Add new site', to: 'new-site'},
	], icon: <Domain />},
	{title: 'Users', type: 'toggle', items: [
		{name: 'All users', to: 'users'},
		{name: 'Add new user', to: 'new-user'},
	], icon: <RecentActors />},
	{title: 'Account settings', type: 'link', 
	icon: <Settings />, to: 'account'},
	{title: '', type: 'blank'},
]