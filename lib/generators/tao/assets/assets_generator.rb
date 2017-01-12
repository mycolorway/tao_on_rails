module Tao
  module Generators
    class AssetsGenerator < Rails::Generators::NamedBase
      invoke "tao:coffee"
      invoke "tao:scss"
    end
  end
end
