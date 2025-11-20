'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const defaultCode = `// Welcome to Vibe Coding! 🚀
// Start coding with style

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fib(10):', fibonacci(10));

// Try different languages from the dropdown!
`;

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' },
  { id: 'markdown', name: 'Markdown' },
];

const themes = [
  { id: 'vs-dark', name: 'Dark' },
  { id: 'light', name: 'Light' },
  { id: 'hc-black', name: 'High Contrast' },
];

export default function Home() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleDownload = () => {
    const extension = language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language === 'python' ? 'py' : 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleClear = () => {
    setCode('');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading Vibe Coding...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="min-h-screen backdrop-blur-3xl bg-black/30">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🚀</div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vibe Coding
                </h1>
              </div>
              <div className="text-sm text-white/60">Code with Style</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          {/* Controls */}
          <div className="mb-4 flex flex-wrap items-center gap-4 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm font-medium">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-purple-400 transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-gray-900">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm font-medium">Theme:</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-purple-400 transition-colors"
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id} className="bg-gray-900">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm font-medium">Font Size:</label>
              <input
                type="number"
                min="10"
                max="30"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-20 outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div className="flex-1"></div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                📋 Copy
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                💾 Download
              </button>
              <button
                onClick={handleClear}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Editor
              height="calc(100vh - 250px)"
              language={language}
              value={code}
              onChange={handleEditorChange}
              theme={theme}
              options={{
                fontSize: fontSize,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
                fontLigatures: true,
                lineNumbers: 'on',
                rulers: [80, 120],
                renderWhitespace: 'selection',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>

          {/* Footer Info */}
          <div className="mt-4 text-center text-white/40 text-sm">
            Lines: {code.split('\n').length} | Characters: {code.length}
          </div>
        </div>
      </div>
    </div>
  );
}
