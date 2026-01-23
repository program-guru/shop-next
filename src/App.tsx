import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main content area, takes up available space */}
      <main className="grow m-5">
        {/* Each page/section component goes here */}
        <AboutUs />
        {/* When you add more pages, they would typically replace AboutUs
            or be conditionally rendered based on some state,
            before routing is implemented.
            For example:
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'products' && <ProductsPage />}
        */}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;