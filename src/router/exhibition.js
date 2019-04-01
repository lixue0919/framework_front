import Login from '@/views/exhibition/common/Login'
import LoginEN from '@/views/exhibition/common/LoginEN'
import Index from '@/views/exhibition/common/Index'
import Home from '@/views/exhibition/home/Home'
import Exhprediction from '@/views/exhibition/prediction/exhprediction/Exhprediction'
import User from '@/views/system/user/User'
import Role from '@/views/system/role/Role'
import Resource from '@/views/system/resource/Resource'
import Permission from '@/views/system/permission/Permission'
import Codelist from '@/views/system/codelist/Codelist'
import Mail from '@/views/system/mail/Mail'

export default [
  {
    path: '/',
    name: 'login',
    component: Login,
    children: [
      {
        path: '/exhibition/login/ch/Phone',
        name: 'exhibition/login/ch/Phone',
        meta: {auth: true, title: "账户重置", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Phone'], resolve)
      },
      {
        path: '/exhibition/login/ch/Mailbox',
        name: 'exhibition/login/ch/Mailbox',
        meta: {auth: true, title: "账户重置", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Mailbox'], resolve)
      },
      {
        path: '/exhibition/login/ch/Administrator',
        name: 'exhibition/login/ch/Administrator',
        meta: {auth: true, title: "账户重置", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Administrator'], resolve)
      },
      {
        path: '/exhibition/login/ch/Reset',
        name: 'exhibition/login/ch/Reset',
        meta: {auth: true, title: "账户重置", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Reset'], resolve)
      },
      {
        path: '/exhibition/login/ch/ForgetPassword',
        name: 'exhibition/login/ch/ForgetPassword',
        meta: {auth: true, title: "忘记用户名", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/ForgetPassword'], resolve)
      },
      {
        path: '/exhibition/login/ch/ForgetUsername',
        name: 'exhibition/login/ch/ForgetUsername',
        meta: {auth: true, title: "忘记密码", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/ForgetUsername'], resolve)
      },
      {
        path: '/exhibition/login/ch/Register',
        name: 'exhibition/login/ch/Register',
        meta: {auth: true, title: "用户注册", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Register'], resolve)
      },
      {
        path: '/exhibition/login/ch/Login',
        name: 'exhibition/login/ch/Login',
        meta: {auth: true, title: "用户登录", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/Login'], resolve)
      },
      {
        path: '/exhibition/login/ch/changePassword',
        name: 'exhibition/login/ch/changePassword',
        meta: {auth: true, title: "忘记密码", operation: true},
        component: resolve => require(['@/views/exhibition/login/ch/ChangePassword'], resolve)
      },
    ],
    redirect:'/exhibition/login/ch/Login'
  },
  {
    path: '/',
    name: 'loginEN',
    component: LoginEN,
    children: [
      {
        path: '/exhibition/login/en/ForgetPassword',
        name: 'exhibition/login/en/ForgetPassword',
        meta: {auth: true, title: "忘记用户名", operation: true},
        component: resolve => require(['@/views/exhibition/login/en/ForgetPassword'], resolve)
      },
      {
        path: '/exhibition/login/en/ForgetUsername',
        name: 'exhibition/login/en/ForgetUsername',
        meta: {auth: true, title: "忘记密码", operation: true},
        component: resolve => require(['@/views/exhibition/login/en/ForgetUsername'], resolve)
      },
      {
        path: '/exhibition/login/en/Register',
        name: 'exhibition/login/en/Register',
        meta: {auth: true, title: "用户注册", operation: true},
        component: resolve => require(['@/views/exhibition/login/en/Register'], resolve)
      },
      {
        path: '/exhibition/login/en/Login',
        name: 'exhibition/login/en/Login',
        meta: {auth: true, title: "用户登录", operation: true},
        component: resolve => require(['@/views/exhibition/login/en/Login'], resolve)
      },
      {
        path: '/exhibition/login/en/changePassword',
        name: 'exhibition/login/en/changePassword',
        meta: {auth: true, title: "忘记密码", operation: true},
        component: resolve => require(['@/views/exhibition/login/en/ChangePassword'], resolve)
      },
    ],
    redirect:'/exhibition/login/en/Login'
  },
  {
    path: '/index',
    name: 'index',
    redirect: 'home',
    meta: {auth: true},
    component: Index,
    children: [
      //----------首页----------
      {
        path: '/home',
        meta: {auth: true, title: "首页"},
        component: Home,
        children: [
          {
            path: '/',
            name: 'home',
            component: resolve => require(['@/views/exhibition/home/homeList'], resolve)
          }
        ]
      },
      //----------展会报名管理----------
      {
        path: '/prediction/exhprediction',
        meta: {auth: true, title: "展会报名管理"},
        component: Exhprediction,
        children: [
          {
            path: '/',
            name: 'exhprediction',
            meta: {keepAlive: true},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionList'], resolve)
          },
          {
            path: '/prediction/exhprediction/detail',
            name: 'exhpredictionDetail',
            meta: {auth: true, title: "展会报名管理详情", keepAlive: false},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionDetail'], resolve)
          },
          {
            path: '/prediction/exhprediction/insert',
            name: 'exhpredictionInsert',
            meta: {auth: true, title: "展会报名管理新增", keepAlive: false},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionEdit'], resolve)
          },
          {
            path: '/prediction/exhprediction/update',
            name: 'exhpredictionUpdate',
            meta: {auth: true, title: "展会报名管理编辑", keepAlive: false},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionEdit'], resolve)
          },
          {
            path: '/prediction/exhprediction/insert_ENG',
            name: 'exhpredictionInsert_ENG',
            meta: {auth: true, title: "展会报名管理新增", keepAlive: false},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionEdit_ENG'], resolve)
          },
          {
            path: '/prediction/exhprediction/update_ENG',
            name: 'exhpredictionUpdate_ENG',
            meta: {auth: true, title: "展会报名管理编辑", keepAlive: false},
            component: resolve => require(['@/views/exhibition/prediction/exhprediction/ExhpredictionEdit_ENG'], resolve)
          },
        ]
      },
      //----------系统管理-用户管理----------
      {
        path: '/system/user',
        meta: {auth: true, title: "用户管理"},
        component: User,
        children: [
          {
            path: '/',
            name: 'user',
            component: resolve => require(['@/views/system/user/UserList'], resolve)
          },
        ]
      },
      //----------系统管理-角色管理----------
      {
        path: '/system/role',
        meta: {auth: true, title: "角色管理"},
        component: Role,
        children: [
          {
            path: '/',
            name: 'role',
            component: resolve => require(['@/views/system/role/RoleList'], resolve)
          },
        ]
      },
      //----------系统管理-资源管理----------
      {
        path: '/system/resource',
        meta: {auth: true, title: "资源管理"},
        component: Resource,
        children: [
          {
            path: '/',
            name: 'resource',
            component: resolve => require(['@/views/system/resource/ResourceList'], resolve)
          },
        ]
      },
      //----------系统管理-权限管理----------
      {
        path: '/system/permission',
        meta: {auth: true, title: "权限管理"},
        component: Permission,
        children: [
          {
            path: '/',
            name: 'permission',
            component: resolve => require(['@/views/system/permission/PermissionList'], resolve)
          },
        ]
      },
      //----------系统管理-代码集管理----------
      {
        path: '/system/codelist',
        meta: {auth: true, title: "代码集管理"},
        component: Codelist,
        children: [
          {
            path: '/',
            name: 'codelist',
            meta: {keepAlive: true},
            component: resolve => require(['@/views/system/codelist/CodelistList'], resolve)
          },
          {
            path: '/system/codelist/detail',
            name: 'codelist/detail',
            meta: {auth: true, title: "代码集详情", keepAlive: false},
            component: resolve => require(['@/views/system/codelist/CodelistDetail'], resolve)
          },
        ]
      },
      //----------系统管理-邮箱管理----------
      {
        path: '/system/mail',
        meta: {auth: true, title: "邮箱管理"},
        component: Mail,
        children: [
          {
            path: '/',
            name: 'mail',
            component: resolve => require(['@/views/system/mail/MailList'], resolve)
          },
        ]
      }
    ]
  }
]