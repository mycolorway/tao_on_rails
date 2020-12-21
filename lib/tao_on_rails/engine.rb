module TaoOnRails
  class Engine < Rails::Engine

    config.eager_load_paths += Dir["#{config.root}/lib"]

    initializer 'tao_on_rails' do
      ::ActiveSupport.on_load :action_view do
        include ::TaoOnRails::ActionView::Helpers
        #load_tao_components ::TaoOnRails::Engine.root
        define_component_helpers
      end
    end

  end
end
