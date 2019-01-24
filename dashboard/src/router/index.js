import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Views
import MathimaView from '@/views/MathimaView'
import GrammateiaView from '@/views/GrammateiaView'
import TeacherView from '@/views/TeacherView'
import SubjectListView from '@/views/SubjectListView'
import LoginView from '@/views/LoginView'
import InfoView from '@/views/InfoView'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'Αρχική'
  },
  {
    path: '/login',
    name: 'Είσοδος',
    component: LoginView,
    meta: { requiresUnAuth: true }
  },
  {
    path: '/info',
    name: 'Πληροφορίες',
    component: InfoView
  },
  {
    path: '/grammateia',
    name: 'Γραμματεία',
    component: GrammateiaView,
    meta: { requiresAuth: true, userType: 'secretary' }
  },
  {
    path: '/mathima',
    name: 'Μάθημα',
    component: MathimaView,
    meta: { requiresAuth: true, userType: 'teacher' }
  },
  {
    path: '/teacherView',
    name: 'Οθόνη Καθηγητή',
    component: TeacherView,
    meta: { requiresAuth: true, userType: 'teacher' }
  },
  {
    path: '/subjectList',
    name: 'Λίστα μαθημάτων',
    component: SubjectListView,
    meta: { requiresAuth: true, userType: 'teacher' }
  },
  {
    path: '*',
    redirect: '/'
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && to.matched.some(record => record.meta.userType === store.getters.user.userType)) {
      next()
    } else {
      next('/')
    }
  } else if (to.matched.some(record => record.meta.requiresUnAuth)) {
    if (store.getters.isLoggedIn) {
      next(from.path)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router