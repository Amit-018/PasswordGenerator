import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);  // Initial password length
  const [numAllowed, setNumAllowed] = useState(false);  // Whether to include numbers
  const [charAllowed, setCharAllowed] = useState(false);  // Whether to include special characters
  const [password, setPassword] = useState("");  // Generated password

  const passwordRef = useRef(null);  // Reference to the password input field

  // Function to generate a new password based on the current settings
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "AQWERTYUIOPSDFGHJKLZXCVBNMasdfghjklpoiuytrewqzxcvbnm";  // Default character set (letters)

    if (numAllowed) str += "0123456789";  // Add numbers if allowed
    if (charAllowed) str += "];!@#$%^&*()_";  // Add special characters if allowed

    // Generate the password character by character
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);  // Set the generated password
  }, [length, numAllowed, charAllowed]);

  // Function to copy the generated password to clipboard
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();  // Select the password field
      window.navigator.clipboard.writeText(password);  // Copy to clipboard
    }
  }, [password]);

  // Generate a new password when any dependency (length, numAllowed, charAllowed) changes
  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900">
      <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-96">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Password Generator
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            value={password}  // Display the generated password
            placeholder="Generated Password"
            readOnly  // Make the input read-only
            ref={passwordRef}  // Assign ref to the input
            className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={copyToClipboard}  // Copy the password on button click
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out text-sm"
          >
            Copy
          </button>
        </div>
        <div className="mb-6">
          <input
            type="range"
            min={8}
            max={100}
            value={length}  // Bind range value to length state
            onChange={(e) => setLength(Number(e.target.value))}  // Update length on change
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(length - 8) / 92 * 100}%, #d1d5db ${(length - 8) / 92 * 100}%, #d1d5db 100%)`,
            }}  // Dynamic background based on length
          />
          <label className="block text-white text-sm mt-2">
            Length: {length}
          </label>
        </div>
        <div className="flex justify-between mb-4">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              checked={numAllowed}  // Bind checkbox to numAllowed state
              onChange={() => setNumAllowed((prev) => !prev)}  // Toggle numAllowed on change
              className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              checked={charAllowed}  // Bind checkbox to charAllowed state
              onChange={() => setCharAllowed((prev) => !prev)}  // Toggle charAllowed on change
              className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
            />
            <span>Include Symbols</span>
          </label>
        </div>
        <button
          onClick={generatePassword}  // Generate a new password on button click
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
