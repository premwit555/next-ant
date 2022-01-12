import '../styles/globals.css'
import '../styles/globals.less'
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import { store } from '../functions/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
