module Tao
  module Generators
    class ChannelGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      argument :actions, type: :array, default: [], banner: "method method"

      check_class_collision suffix: "Channel"

      def create_channel_files
        template "channel.coffee.erb", "app/assets/javascripts/channels/#{name.singularize}.coffee"
        template "channel.rb.erb", "app/channels/#{name.singularize}_channel.rb"
      end

    end
  end
end
