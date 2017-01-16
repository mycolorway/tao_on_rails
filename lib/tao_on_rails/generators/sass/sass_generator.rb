module TaoOnRails
  module Generators
    class SassGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      argument :actions, type: :array, default: %w(index new edit show), banner: "action action"

      class_option :variants, type: :array, default: [], desc: "Generate assets for different variants"

      attr_reader :page_id

      def create_sass_file
        actions.each do |action|
          @page_id = [class_path, file_name, action].flatten.join('-')
          if (variants = options[:variants]).any?
            variants.each do |variant|
              template "sass.erb", File.join("app/assets/stylesheets", variant, name.pluralize, "#{action}_page.scss")
            end
          else
            template "sass.erb", File.join('app/assets/stylesheets', name.pluralize, "#{action}_page.scss")
          end
        end
      end

    end
  end
end
