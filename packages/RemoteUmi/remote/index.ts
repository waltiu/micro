 import Index from '../src/pages'
 import Test from '../src/compoments/Test'
 import Text from '../src/compoments/Text'
 const route=  
[
  { path: '/remote',
  name: '子应用',
  icon: 'smile',
  component: Index ,routes:[
    { exact: true, path: '/remote/test', component: Test},
    { exact: true, path: '/remote/text', component: Text }
  ]},

]
export default route