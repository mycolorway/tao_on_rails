require 'test_helper'
require 'generators/tao/component/component_generator'

class Tao::Generators::ComponentGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ComponentGenerator

  test 'generate component files' do
    assert_no_file 'app/components/posts/autosave_component.rb'
    assert_no_file 'app/assets/javascripts/posts/components/autosave.coffee'
    assert_no_file 'app/assets/stylesheets/posts/components/autosave.scss'
    run_generator %w(posts/autosave)
    assert_file 'app/components/posts/autosave_component.rb' do |content|
      assert_match(/class Posts::AutosaveComponent < ApplicationComponent/, content)
    end
    assert_file 'app/assets/javascripts/posts/components/autosave.coffee' do |content|
      assert_match(/class PostAutosave extends TaoComponent/, content)
    end
    assert_file 'app/assets/stylesheets/posts/components/autosave.scss' do |content|
      assert_match(/app-post-autosave/, content)
    end
  end

  test 'generate component files with variants' do
    assert_no_file 'app/components/posts/autosave_component.rb'
    assert_no_file 'app/assets/javascripts/default/posts/components/autosave.coffee'
    assert_no_file 'app/assets/javascripts/phone/posts/components/autosave.coffee'
    assert_no_file 'app/assets/stylesheets/default/posts/components/autosave.scss'
    assert_no_file 'app/assets/stylesheets/phone/posts/components/autosave.scss'
    run_generator %w(posts/autosave --variants=default phone)
    assert_file 'app/components/posts/autosave_component.rb' do |content|
      assert_match(/class Posts::AutosaveComponent < ApplicationComponent/, content)
    end
    assert_file 'app/assets/javascripts/default/posts/components/autosave.coffee' do |content|
      assert_match(/class PostAutosave extends TaoComponent/, content)
    end
    assert_file 'app/assets/stylesheets/phone/posts/components/autosave.scss' do |content|
      assert_match(/app-post-autosave/, content)
    end
    assert_file 'app/assets/javascripts/default/posts/components/autosave.coffee' do |content|
      assert_match(/class PostAutosave extends TaoComponent/, content)
    end
    assert_file 'app/assets/stylesheets/phone/posts/components/autosave.scss' do |content|
      assert_match(/app-post-autosave/, content)
    end
  end

end
