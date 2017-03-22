require 'tao_on_rails/components/icon_component'
require 'tao_on_rails/components/page_component'

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
        def #{klass.tag_name.underscore} *args, &block
          component = #{klass.name}.new(*args, controller.view_context)
          component.render(&block)
        end
        }
      end
    end

  end
end
