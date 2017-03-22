require 'tao_on_rails/components/icon'
require 'tao_on_rails/components/page'

module TaoOnRails
  module Components

    # Define the dynamic view helpers for components
    # This method should be called in action_view context
    def self.init
      # Dir.glob(Rails.root.join('app/components/*')).each do |component|
      #   require component
      # end

      TaoOnRails::Components::Base.descendants.each do |klass|
        module_eval %Q{
        def #{klass.component_name} options = {}, &block
          component = #{klass.name}.new options, controller.view_context, &block
          component.render
        end
        }
      end
    end

  end
end