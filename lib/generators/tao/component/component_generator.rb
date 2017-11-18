require 'rails/generators'

module Tao
  module Generators

    class ComponentGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      check_class_collision suffix: "Component"

      attr_reader :component_name

      def create_component_file
        @component_name = class_name.underscore.split('/').map(&:singularize).join('_')
        template "component.rb.erb", File.join('app/components', class_path, "#{file_name}_component.rb")
      end

    end
  end
end
