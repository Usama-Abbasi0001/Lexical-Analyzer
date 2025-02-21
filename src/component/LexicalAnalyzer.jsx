import React, { useState } from "react";

const KEYWORDS = ["int", "float", "char", "return", "if", "else", "while", "for", "function"];
const OPERATORS = ["+", "-", "*", "/", "=", "==", "!=", "<", ">", "<=", ">="];
const SEPARATORS = ["(", ")", "{", "}", "[", "]", ",", ";"];

const tokenize = (input) => {
  const tokens = [];
  const lines = input.split("\n");

  lines.forEach((line, lineNumber) => {
    const words = line.match(/\w+|\S/g) || [];

    words.forEach((word) => {
      let type = "Identifier";
      if (KEYWORDS.includes(word)) {
        type = "Keyword";
      } else if (OPERATORS.includes(word)) {
        type = "Operator";
      } else if (SEPARATORS.includes(word)) {
        type = "Separator";
      } else if (!isNaN(word)) {
        type = "Number";
      }
      tokens.push({ line: lineNumber + 1, type, value: word });
    });
  });

  return tokens;
};

function LexicalAnalyzer() {
  const [input, setInput] = useState("int a = 5;\nfloat b = 10.5;");
  const [tokens, setTokens] = useState([]);

  const handleAnalyze = () => {
    setTokens(tokenize(input));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-1">Lexical Analyzer</h1>
      <span className="text-[20px] font-bold">M.Usama Abbasi </span>
      <span className="text-[18px] font-bold">2K22 CS-44</span>
      <textarea
        className="w-96 h-[500px] p-2 border border-gray-700 bg-gray-800 rounded-md"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        onClick={handleAnalyze}
      >
        Analyze
      </button>
      <div className="mt-4 w-96">
        <h2 className="text-xl font-semibold">Tokens:</h2>
        <div className="bg-gray-800 p-4 rounded-md mt-2">
          {tokens.length > 0 ? (
            <table className="w-full border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 p-2">Line</th>
                  <th className="border border-gray-600 p-2">Type</th>
                  <th className="border border-gray-600 p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index}>
                    <td className="border border-gray-600 p-2">{token.line}</td>
                    <td className="border border-gray-600 p-2">{token.type}</td>
                    <td className="border border-gray-600 p-2">{token.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No tokens generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LexicalAnalyzer;
