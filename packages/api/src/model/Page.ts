import { Items } from './Items'
import { Meta } from './Meta'

export interface Page<TData extends Meta<string>> extends Items<TData> {
  cursor: string | null
  next_page: string | null
}
