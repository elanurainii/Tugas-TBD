import { SidebarProvider } from "@/hooks/useSidebar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <main className="bg-gradient-to-b from-primary-400 to-primary-500 dark:from-quaternary-300 dark:to-quaternary-100">
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            height={2}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SidebarProvider>
  );
}
