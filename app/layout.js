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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
