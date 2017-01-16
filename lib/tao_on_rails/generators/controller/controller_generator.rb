module TaoOnRails
  module Generators

    class ControllerGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      argument :actions, type: :array, default: %w(index new create edit update show destroy), banner: "action action"

      check_class_collision suffix: "Controller"

      attr_reader :resource

      def create_controller_file
        @resource = file_name.singularize
        template "controller.rb.erb", File.join('app/controllers', class_path, "#{file_name}_controller.rb")
      end

    end
  end
end
