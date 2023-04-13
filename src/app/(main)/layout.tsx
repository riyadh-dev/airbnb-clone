import ListingCategoriesBar from '@/components/ListingCategoriesBar';
import LogInSignUpModal from '@/components/Modals/LogInSignUpModal';
import Navbar from '@/components/Navbar';

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<ListingCategoriesBar />
			{children}
			<LogInSignUpModal />
		</>
	);
}
