import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Posts } from '../../components/post/Posts';

export const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="h-full">
        <Posts />
      </div>
      <Footer />
    </>
  );
}