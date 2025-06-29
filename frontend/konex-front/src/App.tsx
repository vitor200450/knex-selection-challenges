import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

function App() {
    return (
        <div className="min-h-screen bg-[#d9d9d9]">
            <Header />
            <Main />
            <Footer />
            <Toaster />
        </div>
    );
}

export default App;
