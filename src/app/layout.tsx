import '@fortawesome/fontawesome-free/css/all.min.css'
import 'aos/dist/aos.css'
import 'aos/dist/aos.css'
import './globals.css'
import { Toaster } from 'sonner'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: "Timo's Portfolio",
  description: 'Personal portfolio website'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" defer />
      </head>
      <body className={`${poppins.className} bg-gray-50`}>{children}
      <Toaster />
      </body>
    </html>
  )
}