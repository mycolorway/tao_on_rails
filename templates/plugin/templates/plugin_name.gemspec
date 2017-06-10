# coding: utf-8
$:.push File.expand_path('../lib', __FILE__)

require '<%= name.underscore %>/version'

Gem::Specification.new do |spec|
  spec.name          = '<%= name.underscore %>'
  spec.version       = <%= name.camelize %>::VERSION
  spec.authors       = ['your name']
  spec.email         = ['your email']

  spec.homepage      = ''
  spec.summary       = ''
  spec.description   = ''
  spec.license       = "MIT"

  spec.required_ruby_version     = ">= 2.3.1"

  spec.files = Dir["{lib,vendor}/**/*", "LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "tao_on_rails", "~> 0.9.0"

  spec.add_development_dependency "blade", "~> 0.7.0"
  spec.add_development_dependency "blade-sauce_labs_plugin", "~> 0.7.0"
end
