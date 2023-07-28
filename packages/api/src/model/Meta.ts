export interface Meta<TDataType extends string> {
  _created: number
  _data_type: TDataType
  _is_deleted: boolean
  _modified: number
  _self_link: string
  _user: string
  _uuid: string
}
