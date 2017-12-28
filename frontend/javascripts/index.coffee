import './custom_elements'
import './ujs'
import Module from './module'
import Component from './component'
import Application from './application'
import Page from './page'
import AttributeManager from './attribute_manager'
import helpers from './helpers'

import $ from 'jquery'
import Turbolinks from 'turbolinks'

Turbolinks.start()

export default {
  Module, Component, Application, Page, AttributeManager, helpers
}

export {
  Module, Component, Application, Page, AttributeManager, helpers
}
