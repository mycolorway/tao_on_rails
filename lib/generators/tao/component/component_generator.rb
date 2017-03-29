module Tao
  module Generators

    class ComponentGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      check_class_collision suffix: "Component"

      class_option :variants, type: :array, default: [], desc: "Generate assets for different variants"

      attr_reader :component_name

      def create_component_file
        @component_name = class_name.underscore.split('/').map(&:singularize).join('_')
        template "component.rb.erb", File.join('app/components', class_path, "#{file_name}_component.rb")

        if (variants = options[:variants]).any?
          variants.each do |variant|
            template "component.coffee.erb", File.join('app/assets/javascripts/', variant, class_path, "components/#{file_name}.coffee")
            template "component.scss.erb", File.join('app/assets/stylesheets/', variant, class_path, "components/#{file_name}.scss")
          end
        else
          template "component.coffee.erb", File.join('app/assets/javascripts/', class_path, "components/#{file_name}.coffee")
          template "component.scss.erb", File.join('app/assets/stylesheets/', class_path, "components/#{file_name}.scss")
        end
      end

    end
  end
end
