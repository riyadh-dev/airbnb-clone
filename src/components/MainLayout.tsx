import LogInSignUpModal from '@/components/Modals/LogInSignUpModal';
import Navbar from '@/components/Navbar';
import ConfirmReservationModal from './Modals/ConfirmReservationModal';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
			<LogInSignUpModal />
			<ConfirmReservationModal />
		</>
	);
}
