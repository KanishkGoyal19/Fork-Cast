import '../index.css';
import Header from "../components/Header.jsx"
import Main from "../pages/Main.jsx"
import HeroSection from '../components/HeroSection.jsx';
export default function App() {
    return (
        <div className="min-h-sreen"
        style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* <Header /> */}
            <HeroSection />
            <Main />
        </div>
    )
}