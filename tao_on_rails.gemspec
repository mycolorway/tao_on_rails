# coding: utf-8
$:.push File.expand_path("../lib", __FILE__)

require "tao_on_rails/version"

Gem::Specification.new do |spec|
  spec.name          = "tao_on_rails"
  spec.version       = TaoOnRails::VERSION
  spec.authors       = ["Siyuan Liu", "Terry Tai"]
  spec.email         = ["farthinker@mycolorway.com", "t@mycolorway.com"]

  spec.homepage      = "https://github.com/mycolorway/tao_on_rails"
  spec.summary       = %q{The missing frontend solution for Rails project}
  spec.description   = %q{Ruby on Rails lacks a recommended way to structure your frontend code for many years. Tao on Rails is the framework to fill the gap which will modularize your page with the new Custom Elements v1 API.}
  spec.license       = "MIT"

  spec.files = Dir["{lib,vendor}/**/*", "LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "turbolinks", "~> 5.0.1"
  spec.add_dependency "jquery-rails", "~> 4.3.1"
  spec.add_dependency "lodash-rails", "~> 4.17.4"
  spec.add_dependency "rails", '~> 5.1.1'

  spec.add_development_dependency "sqlite3", '~> 1.3.13'
  spec.add_development_dependency "blade", "~> 0.7.0"
  spec.add_development_dependency "blade-sauce_labs_plugin", "~> 0.7.0"
  # spec.add_development_dependency 'mocha', '~> 1.2'
  # spec.add_development_dependency 'minitest', '5.10.1'
end
