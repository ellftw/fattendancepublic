import Vue from 'vue'
import Router from 'vue-router'
import MathimaView from '@/components/MathimaView'
import GrammateiaView from '@/components/GrammateiaView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mathima',
      name: 'mathima',
      component: MathimaView
    },
    {
      path: '/grammateia',
      name: 'grammateia',
      component: GrammateiaView
    }
  ]
})
