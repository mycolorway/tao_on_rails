module Tao
  module Generators
    class AssetsGenerator < ::Rails::Generators::NamedBase
      hook_for "coffee", in: :tao, type: :boolean, default: true
      hook_for "sass", in: :tao, type: :boolean, default: true
    end
  end
end
