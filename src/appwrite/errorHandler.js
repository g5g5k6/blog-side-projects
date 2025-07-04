function getFriendlyErrorMessage(error) {
    const code = error?.code || error?.response?.code
    // const type = error?.type || error?.response?.type
    let message = '發生未知錯誤'
    switch (code) {
        case 404:
            message="無法連接 Appwrite 服務"
            break 
        default:
            break
    }
    return {
    message,
    code
  }
}

export default getFriendlyErrorMessage