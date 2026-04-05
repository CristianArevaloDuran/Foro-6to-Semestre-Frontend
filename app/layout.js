import "./globals.css";
import Nav from "./components/Nav/Nav";

export const metadata = {
  title: {
    default: "Knotic",
    template: "%s | Knotic"
  },
  description: "Foro para estudiantes"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
