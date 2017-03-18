require 'test_helper'
require 'generators/tao/scaffold/scaffold_generator'

class Tao::Generators::ScaffoldGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ScaffoldGenerator

  test 'generate all files' do
    run_generator %w(employees/dimissions index show --locale=en)

    assert_file 'app/assets/javascripts/employees/dimissions/index.coffee'
    assert_file 'app/assets/javascripts/employees/dimissions/show.coffee'
    assert_file 'app/assets/stylesheets/employees/dimissions/index.scss'
    assert_file 'app/assets/stylesheets/employees/dimissions/show.scss'
    assert_file 'app/controllers/employees/dimissions_controller.rb'
    assert_file 'config/locales/models/employees/dimissions/en.yml'
    assert_file 'config/locales/views/employees/dimissions/en.yml'
    assert_file 'app/views/employees/dimissions/index.html.erb'
    assert_file 'app/views/employees/dimissions/show.html.erb'
  end

end
