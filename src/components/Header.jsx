export default function Header() {
    return (
        <header className="flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md h-16">
            <div className="flex items-center">
                <img
                    className="w-9 h-9 rounded-full border-2 border-white mr-2"
                    src="/images.png"
                    alt="Chef Claude Logo"
                />
                <h1 className="text-white text-lg font-bold">ForkCast</h1>
            </div>
        </header>

    );
}
