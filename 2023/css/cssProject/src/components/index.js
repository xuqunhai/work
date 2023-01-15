import Col from 'vant/lib/col/index.js'
import 'vant/lib/col/index.css'
import Row from 'vant/lib/row/index.js'
import 'vant/lib/row/index.css'
import { Layout, Header, Aside, Main, Footer } from './layout'
import BoxCenter from './box-center'
import SingleCenter from './single-center'
import BoxSkin from './box-skin'

const components = {
  Layout,
  Header,
  Aside,
  Main,
  Footer,
  CRow: Row,
  CCol: Col,
  BoxCenter,
  SingleCenter,
  BoxSkin
}

const install = (app) => {
  Object.keys(components).forEach((key) => {
    if (key === 'CRow' || key === 'CCol') {
      app.component(key, components[key])
    } else {
      app.component(components[key]['name'], components[key])
    }
  })
}

const Mui = {
  install
}

export default Mui
