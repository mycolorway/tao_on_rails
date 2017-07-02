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
        Dir.glob([
          Rails.root.join('lib/components/**/*.rb'),
          Rails.root.join('app/components/**/*.rb')
        ]).each do |component|
          require_dependency component
        end

        TaoOnRails::Components::Base.descendants.each do |klass|
          module_eval %Q{
            def #{klass.tag_name.underscore} *args, &block
              #{klass.name}.new(self, *args).render(&block)
            end
          }
        end
      end

    end
  end
end
