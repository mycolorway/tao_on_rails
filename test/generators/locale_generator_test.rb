require 'test_helper'
require 'generators/tao/locale/locale_generator'

class Tao::Generators::LocaleGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::LocaleGenerator

  test 'generate locale files' do
    assert_no_file 'config/locales/models/employees/dimission/en.yml'
    assert_no_file 'config/locales/models/employees/dimission/zh-CN.yml'
    assert_no_file 'config/locales/views/employees/dimission/en.yml'
    assert_no_file 'config/locales/views/employees/dimission/zh-CN.yml'

    run_generator %w(employees/dimission zh-CN en)

    assert_file 'config/locales/models/employees/dimissions/en.yml' do |content|
      assert_match(/en:/, content)
      assert_match(/employees\/dimission: Dimission/, content)
    end
    assert_file 'config/locales/models/employees/dimissions/zh-CN.yml' do |content|
      assert_match(/zh-CN:/, content)
      assert_match(/employees\/dimission: Dimission/, content)
    end
    assert_file 'config/locales/views/employees/dimissions/en.yml' do |content|
      assert_match(/en:\n  employees:\n    dimissions:/, content)
    end
    assert_file 'config/locales/views/employees/dimissions/zh-CN.yml' do |content|
      assert_match(/zh-CN:\n  employees:\n    dimissions:/, content)
    end
  end

end
