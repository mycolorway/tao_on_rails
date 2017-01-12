module Tao
  module Generators
    class LocaleGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      remove_class_option :actions

      class_option :locales, type: :array, default: [I18n.locale], banner: "locale locale"
      class_option :model, type: :boolean, default: true, desc: "Generate locale files for model"
      class_option :view, type: :boolean, default: true, desc: "Generate locale files for view"

      def copy_to_model
        return unless options[:model]
        locales.each do |locale|
          @locale = locale
          template "model.yml.erb", File.join('config/locales/models', name.singularize, "#{locale}.yml")
        end
      end

      def copy_to_view
        return unless options[:view]
        content = (class_path + [plural_name]).reverse.inject(nil) do |content, path|
          { path => content }
        end
        locales.each do |locale|
          @locale = locale
          create_file File.join('config/locales/views', name.pluralize, "#{locale}.yml"), {locale => content}.to_yaml
        end
      end

    end
  end
end
