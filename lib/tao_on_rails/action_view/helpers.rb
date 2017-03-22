module TaoOnRails
  module ActionView
    module Helpers

      def page_id
        controller_names = controller_path.split('/')
        [controller_names, action_name].compact.flatten.join('-')
      end

      # Define the dynamic view helpers for components
      # This method should be called in action_view context
      def self.define_component_helpers
        Dir.glob([
          Rails.root.join('lib/components/**/*.rb'),
          Rails.root.join('app/components/**/*.rb')
        ]).each do |component|
          require component
        end

        TaoOnRails::Components::Base.descendants.each do |klass|
          params = klass.instance_method(:initialize).parameters
          params.pop
          module_eval %Q{
          def #{klass.tag_name.underscore} #{params.map{|p| "#{p[1]} = nil"}.join(', ')}, &block
            #{klass.name}.new(#{params.map(&:last).join(', ')}, self).render(&block)
          end
          }
        end
      end

    end
  end
end
