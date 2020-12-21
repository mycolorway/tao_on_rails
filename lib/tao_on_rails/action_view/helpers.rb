module TaoOnRails
  module ActionView
    module Helpers
      extend ActiveSupport::Concern

      def page_id
        return @page_id if defined?(@page_id)
        controller_names = controller_path.split('/')
        [controller_names, action_name].compact.flatten.join('_').dasherize
      end

      class_methods do
        # Define the dynamic view helpers for components
        # This method should be called in action_view context
        def define_component_helpers
          #load_tao_components
          ::ActiveSupport.run_load_hooks(:tao_components, self)

          TaoOnRails::BaseComponent.descendants.each do |klass|
            module_eval %Q{
              def #{klass.tag_name.underscore} *args, &block
                #{klass.name}.new(self, *args).render(&block)
              end
            }
          end
        end

        def load_tao_components(root = Rails.root)
          Rails.application.config.autoload_paths << "#{root}/lib/components"
          Rails.application.config.autoload_paths << "#{root}/app/components"
        end
      end
    end
  end
end
