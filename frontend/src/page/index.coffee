import Component from '../component'
import './styles'

export default class Page extends Component

  @attribute 'layout', default: 'default'

  beforeCache: ->
