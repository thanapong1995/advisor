import manageDeputy from '../views/MenageDeputy'
import manageMoiOfficial from '../views/ManageMoiOfficial'

export default [
  {
    path: '/manage/deputy',
    name: 'manageDeputy',
    component: manageDeputy,
  },
  {
    path: '/official',
    name: 'manageMoiOfficial',
    component: manageMoiOfficial,
  },
]
