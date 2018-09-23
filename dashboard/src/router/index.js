import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MathimaView from '@/components/MathimaView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mathima',
      name: 'mathima',
      component: MathimaView
    }
  ]
})
