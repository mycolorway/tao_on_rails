module Tao
  module Generators
    class CoffeeGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      argument :actions, type: :array, default: %w(index new edit show), banner: "new edit"

      class_option :variants, type: :array, default: [], desc: "Generate assets for different variants"

      attr_reader :page_id

      def create_coffee_file
        actions.each do |action|
          @page_id = [class_path, file_name, action].flatten.join('-')
          if (variants = options[:variants]).any?
            variants.each do |variant|
              template "coffee.erb", File.join("app/assets/javascripts", variant, name.pluralize, "#{action}_page.coffee")
            end
          else
            template "coffee.erb", File.join('app/assets/javascripts', name.pluralize, "#{action}_page.coffee")
          end
        end
      end

    end
  end
end
