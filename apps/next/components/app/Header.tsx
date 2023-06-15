import Logo from './Logo';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className='bg-gray-200 min-h-[75px] flex items-center justify-between px-4'>
      <Logo />
      <Navbar />
    </div>
  );
}
