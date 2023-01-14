import Col from 'vant/lib/col/index.js'
import 'vant/lib/col/index.css'
import Row from 'vant/lib/row/index.js'
import 'vant/lib/row/index.css'
import { Layout, Header, Aside, Main, Footer } from './layout'

const components = {
  Layout,
  Header,
  Aside,
  Main,
  Footer,
  CRow: Row,
  CCol: Col
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
