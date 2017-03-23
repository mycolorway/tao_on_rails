require 'fileutils'

def apply_template!
  assert_rails_version
  assert_options
  add_template_dir_to_source_paths

  plugin_name = name.underscore

  remove_dir 'bin'
  remove_dir 'lib/tasks'
  template 'lib/plugin_name/engine.rb', "lib/#{plugin_name}/engine.rb"
  template 'lib/plugin_name/component.rb', "lib/#{plugin_name}/component.rb"
  template 'lib/plugin_name.rb', "lib/#{plugin_name}.rb", force: true

  template 'lib/assets/javascripts/plugin_name.coffee', "lib/assets/javascripts/#{plugin_name}.coffee"
  template 'lib/assets/stylesheets/plugin_name.scss', "lib/assets/stylesheets/#{plugin_name}.scss"

  template 'test/plugin_name_test.rb', "test/#{plugin_name}_test.rb", force: true
  template 'test/test_helper.rb', force: true
  template 'test/javascripts/plugin_name_test.coffee', "test/javascripts/#{plugin_name}_test.coffee"

  template '.blade.yml'
  template '.gitignore', force: true
  template '.travis.yml'
  template 'index.html'
  template 'Rakefile', force: true
  template 'plugin_name.gemspec', "#{plugin_name}.gemspec", force: true

  inside do
    FileUtils.mv 'MIT-LICENSE', 'LICENSE'
  end
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
