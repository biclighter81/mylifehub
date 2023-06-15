import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex flex-col h-screen overflow-x-hidden overflow-auto'>
        <Header />
        <div className='flex-grow px-8 py-4 overflow-y-auto'>{children}</div>
        <Footer />
      </div>
    </>
  );
}
