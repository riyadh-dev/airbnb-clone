import { Logo } from './Logo';
import RightSection from './RightSection';
import Search from './Search';

export default function Navbar() {
	return (
		<nav className='sticky top-0 z-30 flex h-20 items-center border-b bg-inherit px-10 lg:justify-between xl:px-20'>
			{Logo}
			<Search />
			<RightSection />
		</nav>
	);
}
