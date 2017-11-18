require 'test_helper'
require 'generators/tao/component/component_generator'

class Tao::Generators::ComponentGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ComponentGenerator

  test 'generate component files' do
    assert_no_file 'app/components/posts/autosave_component.rb'
    run_generator %w(posts/autosave)
    assert_file 'app/components/posts/autosave_component.rb' do |content|
      assert_match(/class Posts::AutosaveComponent < ApplicationComponent/, content)
    end
  end

end
