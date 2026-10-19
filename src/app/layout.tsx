import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title:'El Porvenir | Coastal Land Investment — San Felipe, Baja California',
  description:'Private coastal land investment opportunity in Playa El Porvenir, San Felipe, Baja California. Presented by Reynoso & Asociados.',
  robots: {index:false,follow:false}, // enable only after documentary/content approval
  openGraph: {title:'El Porvenir | Coastal Land Investment',description:'Where the Desert Meets the Sea',images:['/assets/hero-concept.webp']},
};
export const viewport: Viewport = { width:'device-width',initialScale:1,themeColor:'#102B32' };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es"><body>{children}</body></html>;
}
