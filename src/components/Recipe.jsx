import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Recipe</h2>
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:mt-8 prose-h3:mt-6 prose-p:leading-7 prose-li:my-1">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ node, ...props }) => (
                            <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
                                <table className="m-0 min-w-full" {...props} />
                            </div>
                        ),
                    }}
                >
                    {props.recipe}
                </ReactMarkdown>
            </div>

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
