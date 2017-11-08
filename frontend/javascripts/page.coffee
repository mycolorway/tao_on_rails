import Component from './component'

export default class Page extends Component

  @attribute 'layout', default: 'default'

  beforeCache: ->
