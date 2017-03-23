require "shellwords"

def apply_template!
  assert_rails_version
  assert_options
  add_template_dir_to_source_paths

  gem 'tao_on_rails'

  remove_file 'app/assets/javascripts/cable.js'
  remove_file 'app/assets/javascripts/application.js'
  remove_file 'app/assets/stylesheets/application.css'

  template 'app/assets/javascripts/application.coffee'
  template 'app/assets/stylesheets/application.scss'
  template 'app/assets/javascripts/home/index.coffee'
  template 'app/assets/stylesheets/home/index.scss'

  template 'app/views/layouts/application.html.erb', force: true
  template 'app/views/home/index.html.erb'

  template 'app/controllers/home_controller.rb'
  route "root to: 'home#index'"
end

def assert_rails_version
  requirement = Gem::Requirement.new('~> 5.0.0')
  rails_version = Gem::Version.new(Rails::VERSION::STRING)
  return if requirement.satisfied_by?(rails_version)
  fail Rails::Generators::Error, 'Rails #{RAILS_REQUIREMENT} is required'
end

def assert_options
  valid_options = {
    :skip_gemfile => false,
    :skip_bundle => false
  }
  valid_options.each do |key, expected|
    next unless options.key?(key)
    actual = options[key]
    if actual != expected
      fail Rails::Generators::Error, "Unsupported option: #{key}=#{actual}"
    end
  end
end

def add_template_dir_to_source_paths
  if __FILE__ =~ %r{\Ahttps?://}
    tmp_dir = Dir.mktmpdir('_tao_template')
    at_exit { remove_dir tmp_dir }
    repo_url = 'https://github.com/mycolorway/tao_on_rails.git'
    git clone: "--quiet --depth 1 #{repo_url} #{tmp_dir}"
    source_paths.unshift File.expand_path('templates/app/templates', tmp_dir)
  else
    source_paths.unshift(File.expand_path('../templates', __FILE__))
  end
end

apply_template!
