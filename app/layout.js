import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./Components/Navigation/navigationbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./Components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "George Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <div className="bg-white dark:bg-neutral-800 text-black dark:text-white min-h-screen transition-colors duration-300">
            <NavigationBar />
            {children}
            <Footer text="© 2023 George Portfolio. All rights reserved." />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
