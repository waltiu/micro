import { Suspense, lazy } from 'react'
import { TodoProvider } from '@/context'
import 'bootstrap/dist/css/bootstrap.min.css'

// styles
import { Container } from 'react-bootstrap'
// components
import { TodoForm, TodoList, TodoFilters, TodoControls } from '@/components'
const RemoteApp = lazy(() => import("@RemoteWebpack/index"));
const RemoteUmi =lazy(()=>import("@RemoteUmi/index"))
const App = () => (
  <Container className='mt-2 text-center' >
    <TodoProvider>
      <h1>React Todo App</h1>
      <TodoForm />
      <TodoFilters />
      <TodoList />
      <TodoControls />
      <Suspense fallback="loading">
        <RemoteApp />
      </Suspense>
      <Suspense fallback="loading">
        <RemoteUmi />
      </Suspense>
    </TodoProvider>
  </Container>
)
export default App
