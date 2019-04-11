import router from '../router'
export default {
  action: "account_box", // displayIcon
  title: "จัดการผู้ใช้งานระบบ", // MenuName
  active: true,
  click: "emp", // redirectPath
  menuGroup: [
    {
      menuName:'ข้อมูลผู้บริหาร',
      action: "account_box",
      active:true,
    menuItem:[{
      name: "จัดการข้อมูลผู้บริหาร",
      link: null,
      active: false,
      path:'/manage/deputy',
    },
    // {
    //   name: "ค้นหาประวัติผู้ใช้งานระบบ",
    //   link: null,
    //   active: false,
    //   path:'/historyUser',
    // },
    ]
  },
    {
      menuName:'ข้อมูลบุคคลากรในกรมการปกครอง',
      action: "account_box",
      active:false,
      menuItem:[{
        name: "จัดการข้าราชการ",
        link: null,
        active: false,
        path:'/official',
      },
        {
          name: "จัดการพนักงานราชการ",
          link: null,
          active: false,
          path:'/historyUsaer',
        },]
    },
  ]
}
