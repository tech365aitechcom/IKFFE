import { Saira_Condensed } from 'next/font/google'
import './globals.css'

const saira = Saira_Condensed({
  variable: '--font-saira-condensed',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'IKF - International Kickboxing Federation',
  description:
    'The IKF is the world’s largest amateur and professional kickboxing organization.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${saira.variable} antialiased`}>{children}</body>
    </html>
  )
}
