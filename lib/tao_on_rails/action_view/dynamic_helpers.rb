module TaoOnRails
  module ActionView
    module DynamicHelpers

      def self.init_components
        # Define the dynamic helper for components
        Dir.glob(Rails.root.join('app/components/*')).each do |component| require component end
        TaoOnRails::Component.descendants.each do |klass|
          instance = klass.new
          module_eval %Q{
          def #{instance.component_name} options = {}, &block
            component = #{klass.name}.new options, controller.view_context, &block
            component.render
          end
          }
        end
      end

    end
  end
end
