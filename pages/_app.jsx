import '../styles/globals.css'
import '../styles/globals.less'
import 'antd/dist/antd.less'

import { store } from '../components/app'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
