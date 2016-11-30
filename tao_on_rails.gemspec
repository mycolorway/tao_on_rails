# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'tao_on_rails/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "tao_on_rails"
  spec.version       = TaoOnRails::Rails::VERSION
  spec.authors       = ["Siyuan Liu, Terry Tai"]
  spec.email         = ["t@mycolorway.com"]

  spec.summary       = %q{The missing frontend solucation for Rails project}
  spec.description   = %q{The missing frontend solucation for Rails project}
  spec.homepage      = "https://github.com/mycolorway/tao_on_rails"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "rails", ">= 4.0.0"
  spec.add_dependency "jquery-rails", ">= 4.2.0"
  spec.add_dependency "lodash-rails", ">= 4.16.0"
  spec.add_dependency "normalize-rails", ">= 4.1.0"
  spec.add_dependency "turbolinks", "~> 5.0"
  spec.add_dependency "i18n-js", "~> 3.0.0.rc14"
  spec.add_dependency "gon", "~> 6.0"

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
