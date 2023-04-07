import { Logo } from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

export default function Navbar() {
	return (
		<nav className='sticky top-0 flex h-20 items-center border px-10 lg:justify-between xl:px-20'>
			{Logo}
			<Search />
			<UserMenu />
		</nav>
	);
}
