module Tao
  module Generators
    class ScaffoldGenerator < Rails::Generators::NamedBase
      
      argument :actions, type: :array, default: %w(index new create edit update show destroy), banner: "action action"

      hook_for 'view', in: :tao, type: :boolean, default: true
      hook_for 'controller', in: :tao, type: :boolean, default: true
      hook_for 'assets', in: :tao, type: :boolean, default: true

      hook_for 'channel', in: :tao, type: :array, default: [] do |instance, channel|
        instance.invoke channel, options[:channel]
      end

      hook_for 'locale', in: :tao, type: :array, default: [] do |instance, locale|
        instance.invoke locale, options[:locale]
      end
    end
  end
end
