require 'turbolinks'
require 'jquery-rails'
require 'lodash-rails'
require 'tao_on_rails/action_view/helpers'
require 'tao_on_rails/components'

module TaoOnRails
  class Engine < Rails::Engine

    if Rails.root
      config.eager_load_paths << Rails.root.join('app/components')
      config.eager_load_paths << Rails.root.join('lib/components')
    end

    initializer "tao_on_rails.view_helpers" do |app|
      ::ActiveSupport.on_load :action_view do
        include TaoOnRails::ActionView::Helpers
        TaoOnRails::Components.init
      end
    end

  end
end
