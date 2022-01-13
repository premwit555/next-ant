import { message } from 'antd'

export const SuccessToast = (msg) => {
  message.success({
    content: `${msg}`,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  })
}
