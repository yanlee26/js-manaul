export function onCopyToClipboard(text: string) {
  const newNavigator: any = window.navigator

  if (newNavigator.clipboard) {
    return newNavigator.clipboard.writeText(text)
  } else {
    return new Promise<void>((resolve, reject) => {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        resolve()
        document.removeChild(textarea)
      } catch (e) {
        reject(e)
      }
    })
  }
}
