import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export default function Recipe(props) {
    const [copied, setCopied] = useState(false); // State to manage copy status
    const [saved, setSaved] = useState(false); // State to manage save status

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(props.recipe);  // Copy recipe text to clipboard
            setCopied(true);  // Set copied status to true
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <section className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Generated Recipe:</h2>
            <ReactMarkdown className="prose prose-blue text-gray-700">
                {props.recipe}
            </ReactMarkdown>

            <div className="mt-4 flex items-center gap-4">
                <button
                    onClick={handleCopy}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                    {copied ? "Copied!" : "Copy Recipe"}
                </button>
                <button
                    onClick={() => setSaved(!saved)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg shadow transition duration-300 border border-yellow-400 text-yellow-500 hover:bg-yellow-100"
                >
                    <span>Save Recipe</span>
                    <span className={saved ? "text-yellow-500" : "text-gray-400"}>★</span>
                </button>

            </div>

        </section>
    );
}
