require 'turbolinks'
require 'jquery-rails'
require 'lodash-rails'

module TaoOnRails
  class Engine < Rails::Engine

    config.generators do |g|
      g.fallbacks[:tao] = :rails
    end

  end
end
