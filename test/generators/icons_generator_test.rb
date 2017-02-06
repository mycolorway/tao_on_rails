require 'test_helper'
require 'generators/tao/assets/icons_generator'

class Tao::Generators::IconsGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  setup do
    copy_from = File.expand_path('icons/Zhiren.svg', File.dirname(__FILE__))
    copy_to = File.expand_path(destination_root, 'app/assets/icons/zhiren.svg')
    FileUtils.cp copy_from, copy_to
  end

  tests Tao::Generators::IconsGenerator

  test 'generate icons file' do
    assert_no_file 'lib/assets/javascripts/tao/icons.coffee'
    run_generator
    assert_file 'lib/assets/javascripts/tao/icons.coffee' do |content|
      assert_match(/Tao.iconsHtml =/, content)
      assert_match(/<symbol id="icon-zhiren"/, content)
    end
  end

end
