require "fileutils"
require "shellwords"

def apply_template!
  assert_rails_version
  assert_options
  add_template_dir_to_source_paths

  gem 'tao_on_rails', github: 'mycolorway/tao_on_rails', branch: 'refactor-structure'
  create_assets_files
  create_view_files
  create_controller_files
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
    source_paths.unshift File.expand_path('lib/templates/app/templates', tmp_dir)
    at_exit { FileUtils.remove_entry(tmp_dir) }
    git :clone => [
      "--quiet --depth 1",
      "https://github.com/mycolorway/tao_on_rails.git",
      tmp_dir
    ].map(&:shellescape).join(" ")
  else
    source_paths.unshift(File.expand_path('../templates', __FILE__))
  end
end

def create_assets_files
  remove_file 'app/assets/javascripts/cable.js'
  remove_file 'app/assets/javascripts/application.js'
  remove_file 'app/assets/stylesheets/application.css'

  template 'app/assets/javascripts/application.coffee'
  template 'app/assets/stylesheets/application.scss'
  template 'app/assets/javascripts/home/index_page.coffee'
  template 'app/assets/stylesheets/home/index_page.scss'
end

def create_view_files
  remove_file 'app/views/layouts/application.html.erb'
  remove_file 'app/helpers/application_helper.rb'

  template 'app/views/layouts/application.html.erb'
  template 'app/helpers/application_helper.rb'
  template 'app/views/home/index.html.erb'
end

def create_controller_files
  template 'app/controllers/home_controller.rb'
  route "root to: 'home#index'"
end

apply_template!
