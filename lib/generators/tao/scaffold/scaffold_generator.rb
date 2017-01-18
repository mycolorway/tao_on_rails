module Tao
  module Generators
    class ScaffoldGenerator < Rails::Generators::NamedBase

      argument :actions, type: :array, default: %w(index new create edit update show destroy), banner: "action action"

      hook_for 'view', in: :tao, type: :boolean, default: true
      hook_for 'controller', in: :tao, type: :boolean, default: true
      hook_for 'assets', in: :tao, type: :boolean, default: true

      hook_for 'locale', in: :tao, type: :array do |instance, locale|
        instance.invoke 'tao:locale', [instance.name] << locale
      end
    end
  end
end
