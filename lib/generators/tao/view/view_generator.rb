module Tao
  module Generators
    class ViewGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      argument :actions, type: :array, default: %w(index show new create edit update destroy), banner: "action action"

      class_option :variants, type: :array, default: [], desc: "Generate assets for different variants"

      attr_reader :resource

      def create_view_files
        @resource = file_name.singularize
        view_path = Pathname.new(File.join("app/views", name.pluralize))

        actions.each do |action|
          if (variants = options[:variants]).any?
            variants.each do |variant|
              variant = variant == 'default' ? '' else "+#{variant}"
              if action.in? %w(create update destroy)
                template "#{action}.js.coffee", view_path.join "#{action}.js#{variant}.coffee"
              else
                template "#{action}.html.erb", view_path.join "#{action}.html#{variant}.erb"
              end
            end
          else
            if action.in? %w(create update destroy)
              template "#{action}.js.coffee", view_path.join "#{action}.js.coffee"
            else
              template "#{action}.html.erb", view_path.join "#{action}.html.erb"
            end
          end
        end
      end

    end
  end
end
