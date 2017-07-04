module TaoOnRails
  module ActionView
    module Helpers

      def page_id
        return @page_id if defined?(@page_id)
        controller_names = controller_path.split('/')
        [controller_names, action_name].compact.flatten.join('_').dasherize
      end

      # Define the dynamic view helpers for components
      # This method should be called in action_view context
      def self.define_component_helpers
        load_tao_components
        ::ActiveSupport.run_load_hooks(:tao_components, self)

        TaoOnRails::Components::Base.descendants.each do |klass|
          module_eval %Q{
            def #{klass.tag_name.underscore} *args, &block
              #{klass.name}.new(self, *args).render(&block)
            end
          }
        end
      end

      def self.load_tao_components(root = Rails.root)
        Dir.glob([
          root.join('lib/components/**/*.rb'),
          root.join('app/components/**/*.rb')
        ]).each do |component|
          require_dependency component
        end
      end

    end
  end
end
