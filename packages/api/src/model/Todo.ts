import { Meta } from './Meta'

export interface TodoTemplate {
  title: string
  isComplete: boolean
}

export interface Todo extends TodoTemplate, Meta<'todo'> {}
