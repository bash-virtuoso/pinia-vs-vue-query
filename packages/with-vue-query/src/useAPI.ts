import { API, APIOptions } from 'api'
import { InjectionKey, Plugin, inject } from 'vue'

const apiInjectionKey: InjectionKey<API> = Symbol('api')

export function useAPI(): API {
  return inject(apiInjectionKey)!
}

useAPI.plugin = {
  install: (app, options: APIOptions) => {
    app.provide(apiInjectionKey, new API(options))
  },
} satisfies Plugin
