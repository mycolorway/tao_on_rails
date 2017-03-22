require 'turbolinks'
require 'jquery-rails'
require 'lodash-rails'
require 'tao_on_rails/action_view/helpers'
require 'tao_on_rails/components'

module TaoOnRails
  class Engine < Rails::Engine

    initializer "tao_on_rails.view_helpers" do |app|
      ::ActiveSupport.on_load :action_view do
        TaoOnRails::ActionView::Helpers.define_component_helpers
        include TaoOnRails::ActionView::Helpers
      end
    end

  end
end
