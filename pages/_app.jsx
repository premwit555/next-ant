import '../styles/globals.css'
import '../styles/globals.less'
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import { store } from '../functions/store'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>{' '}
      </Provider>
  )
}

export default MyApp
