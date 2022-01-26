
import Text from '@/compoments/Text'
import Test from '@/compoments/Test'

const routes=  
  [
    { path: '/', component: '@/pages/index' ,routes:[
      { exact: true, path: '/test', component: '@/compoments/Test' },
      { exact: true, path: '/text', component: '@/compoments/Text' }
    ]},

  ]


  export default routes