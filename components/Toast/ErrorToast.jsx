import { message } from 'antd'

//                  toast Error
export const ErrorToast = (msg) => {
  message.error({
    content: `${msg}`,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  })
}
