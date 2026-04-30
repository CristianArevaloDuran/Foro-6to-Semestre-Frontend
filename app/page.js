export const metadata = {
  title: "Homepage"
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-dvw min-h-dvh bg-(--color-background) pt-[calc(var(--nav-height)+1rem)] px-4 md:px-10 pb-10">
      <section className="max-w-6xl mx-auto grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="bg-(--color-foreground) p-6 md:p-10 shadow-[0_0_10px_2px_#ddfaa4]">
          <p className="font-(family-name:--font-quicksand) font-bold text-(--text-highlight)">
            Foro estudiantil para compartir y crecer
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-(family-name:--font-doto) font-black leading-[0.95]">
            Knotic
          </h1>
          <p className="mt-4 text-base md:text-lg font-(family-name:--font-quicksand)">
            Un espacio simple para publicar dudas, resolver preguntas y conectar con estudiantes de tu semestre.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="bg-black text-(--text-regular-white) px-5 py-3 font-(family-name:--font-doto) font-black"
            >
              Crear cuenta
            </Link>
            <Link
              href="/login"
              className="border-2 border-black px-5 py-3 font-(family-name:--font-doto) font-black"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        <div className="bg-black text-(--text-regular-white) p-6 md:p-8 h-full flex flex-col justify-between">
          <h2 className="text-2xl md:text-3xl font-(family-name:--font-doto) font-black">
            ¿Qué puedes hacer aquí?
          </h2>
          <ul className="mt-4 space-y-3 font-(family-name:--font-quicksand)">
            <li>Publicar preguntas por materia.</li>
            <li>Recibir respuestas de otros estudiantes.</li>
            <li>Construir tu perfil dentro de la comunidad.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
