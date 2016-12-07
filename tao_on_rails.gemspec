# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'tao_on_rails/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "tao_on_rails"
  spec.version       = TaoOnRails::Rails::VERSION
  spec.authors       = ["Siyuan Liu", "Terry Tai"]
  spec.email         = ["farthinker@mycolorway.com", "t@mycolorway.com"]

  spec.summary       = %q{The missing frontend solucation for Rails project}
  spec.description   = %q{The missing frontend solucation for Rails project}
  spec.homepage      = "https://github.com/mycolorway/tao_on_rails"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_runtime_dependency "jquery-rails", "~> 4.2"
  spec.add_runtime_dependency "lodash-rails", "~> 4.16"
  spec.add_runtime_dependency "normalize-rails", "~> 4.1"

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
