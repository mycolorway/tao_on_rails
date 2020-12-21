# coding: utf-8
$:.push File.expand_path("../lib", __FILE__)

require "tao_on_rails/version"

Gem::Specification.new do |spec|
  spec.name          = "tao_on_rails"
  spec.version       = TaoOnRails::VERSION
  spec.authors       = ["Siyuan Liu", "Terry Tai"]
  spec.email         = ["farthinker@mycolorway.com", "t@mycolorway.com"]

  spec.homepage      = "https://github.com/mycolorway/tao_on_rails"
  spec.summary       = %q{The component solution for Rails project}
  spec.description   = %q{Tao on Rails provide frontend component based on Custom Elements v1 and backend component for rendering.}
  spec.license       = "MIT"

  spec.required_ruby_version     = ">= 2.3.1"

  spec.files = Dir["{lib,vendor}/**/*", "LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", '>= 5.0.0'

  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency 'mocha', '>= 1.2.1'
end
