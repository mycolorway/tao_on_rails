require 'test_helper'
require 'generators/tao/install/install_generator'

class Tao::Generators::InstallGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::InstallGenerator

  test 'install tao files' do
    assert_no_file 'app/assets/javascripts/application.coffee'
    assert_no_file 'app/assets/stylesheets/application.scss'
    assert_no_file 'app/assets/stylesheets/_globals.scss'
    assert_no_file 'app/components/application_component.rb'

    run_generator

    assert_file 'app/assets/javascripts/application.coffee'
    assert_file 'app/assets/stylesheets/application.scss'
    assert_file 'app/assets/stylesheets/_globals.scss'
    assert_file 'app/components/application_component.rb'
    assert_file 'app/views/layouts/application.html.erb' do |content|
      assert_match(/tao_page/, content)
    end
  end

end
