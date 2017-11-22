import './custom_elements'
import Module from './module'
import Component from './component'
import Application from './application'
import Page from './page'
import AttributeManager from './attribute_manager'
import helpers from './helpers'

import $ from 'jquery'
import Rails from 'rails-ujs'
import Turbolinks from 'turbolinks'

# Make sure that every Ajax request sends the CSRF token
$.ajaxPrefilter (options, originalOptions, xhr) ->
  if !options.crossDomain
    token = $('meta[name=csrf-token]').attr('content')
    xhr.setRequestHeader('X-CSRF-Token', token) if token

Rails.start()
Turbolinks.start()

export default {
  Module, Component, Application, Page, AttributeManager, helpers
}

export {
  Module, Component, Application, Page, AttributeManager, helpers
}
