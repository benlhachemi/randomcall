export default function sleep(amount: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, amount)
  })
}