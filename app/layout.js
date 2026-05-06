import "./globals.css";
import Nav from "./components/Nav/Nav";
import { AuthProvider } from "./lib/AuthContext.js";

export const metadata = {
  title: {
    default: "Knotic",
    template: "%s | Knotic"
  },
  description: "Foro para estudiantes"
}

const API_URL = process.env.API_URL;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider apiUrl={API_URL}>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
