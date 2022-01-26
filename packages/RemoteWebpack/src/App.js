import { TodoProvider } from '@/context'
// styles
import { Container } from 'react-bootstrap'
// components
import { TodoForm, TodoList, TodoFilters, TodoControls } from '@/components'

 const Base = () => (
  <Container className='mt-2 text-center' >
    <TodoProvider>
      <h1 >React Todo App</h1>
      <TodoForm />
      <TodoFilters />
      <TodoList />
      <TodoControls />
    </TodoProvider>
  </Container>
)
export default Base
