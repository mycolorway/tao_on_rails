require 'test_helper'
require 'generators/tao/assets/assets_generator'

class Tao::Generators::AssetsGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::AssetsGenerator

  test 'generate assets files' do
    assert_no_file 'app/assets/javascripts/employees/index.coffee'
    assert_no_file 'app/assets/stylesheets/employees/index.scss'
    run_generator %w(employee index)
    assert_file 'app/assets/javascripts/employees/index.coffee' do |content|
      assert_match(/class EmployeeIndexPage extends TaoPage/, content)
    end
    assert_file 'app/assets/stylesheets/employees/index.scss' do |content|
      assert_match(/employee-index-page \{/, content)
    end
  end

  test 'generate assets files with variants' do
    assert_no_file 'app/assets/javascripts/employees/default/index.coffee'
    assert_no_file 'app/assets/stylesheets/employees/default/index.scss'
    assert_no_file 'app/assets/javascripts/employees/phone/index.coffee'
    assert_no_file 'app/assets/stylesheets/employees/phone/index.scss'
    run_generator %w(employee index --variants=default phone)
    assert_file 'app/assets/javascripts/default/employees/index.coffee' do |content|
      assert_match(/class EmployeeIndexPage extends TaoPage/, content)
    end
    assert_file 'app/assets/stylesheets/default/employees/index.scss' do |content|
      assert_match(/employee-index-page \{/, content)
    end
    assert_file 'app/assets/javascripts/phone/employees/index.coffee' do |content|
      assert_match(/class EmployeeIndexPage extends TaoPage/, content)
    end
    assert_file 'app/assets/stylesheets/phone/employees/index.scss' do |content|
      assert_match(/employee-index-page \{/, content)
    end
  end
end
