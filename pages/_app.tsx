import '../styles/globals.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
import { AppPropsType } from 'next/dist/next-server/lib/utils'

function MyApp({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />
}

export default MyApp
