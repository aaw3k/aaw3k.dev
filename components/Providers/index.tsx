import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' });

const StyleFont = () => (
  <style jsx global>{`
    :root {
      --font-inter: ${inter.style.fontFamily};
    }
  `}</style>
);

type Props = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'dynamic';
};

export const Providers = ({ children, ...props }: Props) => {
  return (
    <ThemeProvider defaultTheme="system" {...props}>
      <StyleFont />
      {children}
      <Analytics />
    </ThemeProvider>
  );
};
