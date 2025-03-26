import WelcomeSection from './components/Welcome';
import CategoryAnalytics from './components/CategoryAnalytics';
import TopManufacturers from './components/TopManufacturers';
import ActionClasses from './components/ActionClasses';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <WelcomeSection />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-6">
            <CategoryAnalytics />
            <ActionClasses />
          </div>
          <div className="space-y-6">
            <TopManufacturers />
          </div>
        </div>
      </div>
    </div>
  );
}