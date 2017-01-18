require 'test_helper'
require 'generators/tao/view/view_generator'

class Tao::Generators::ViewGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ViewGenerator

  test 'generate view files' do
    assert_no_file 'app/views/employees/dimissions/index.html.erb'
    assert_no_file 'app/views/employees/dimissions/show.html.erb'
    assert_no_file 'app/views/employees/dimissions/new.html.erb'
    assert_no_file 'app/views/employees/dimissions/create.js.coffee'
    assert_no_file 'app/views/employees/dimissions/edit.html.erb'
    assert_no_file 'app/views/employees/dimissions/update.js.coffee'
    assert_no_file 'app/views/employees/dimissions/destroy.js.coffee'

    run_generator %w(employees/dimissions)

    assert_file 'app/views/employees/dimissions/index.html.erb'
    assert_file 'app/views/employees/dimissions/show.html.erb'
    assert_file 'app/views/employees/dimissions/new.html.erb'
    assert_file 'app/views/employees/dimissions/create.js.coffee'
    assert_file 'app/views/employees/dimissions/edit.html.erb'
    assert_file 'app/views/employees/dimissions/update.js.coffee'
    assert_file 'app/views/employees/dimissions/destroy.js.coffee'
  end

end
