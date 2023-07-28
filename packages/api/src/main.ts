export const API = {
  dummy: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 'Hello, World!'
  },
}
