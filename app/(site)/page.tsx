import WelcomeSection from './components/Welcome';
import CategoryAnalytics from './components/CategoryAnalytics';
import PopularMedicines from './components/PopularMedicines';
import TopManufacturers from './components/TopManufacturers';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <WelcomeSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <CategoryAnalytics />
          </div>
          <div>
            <PopularMedicines />
          </div>
          <div>
            <TopManufacturers />
          </div>
        </div>
      </div>
    </div>
  );
}