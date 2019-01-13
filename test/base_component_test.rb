require  'test_helper'

module TaoOnRails
  class BaseComponentTest < ::ActionView::TestCase

    class PostComponent < BaseComponent
    end

    #initialize
    test "it should set he view, options, and template_path" do
      pc = PostComponent.new(view, { display: 'disable' })
      assert_equal view, pc.view
      assert_equal({ display: 'disable'}, pc.options)
      assert pc.template_paths.include?('components/tao_on_rails/base_component_test')
      assert pc.template_paths.include?('tao_on_rails/base_component_test/components')
    end

    test "it could customlize tag name" do
      pc = PostComponent.new(view, { display: 'disable', tag_name: 'another-post'})
      assert_equal 'another-post', pc.tag_name
    end

    # #render
    test "when block not given and template not exist, it should render with just the content with content_tag" do
      pc = PostComponent.new(view)
      assert_equal "<tao-on-rail-base-component-test-post></tao-on-rail-base-component-test-post>", pc.render
    end

    test "when block given, and template_path not exist, it should render the content with block content in content tag" do
      pc = PostComponent.new(view)
      assert_equal "<tao-on-rail-base-component-test-post>Hello</tao-on-rail-base-component-test-post>", pc.render { "Hello" }
    end

    test "when block not given and template exist, it should render the template" do
      pc = PostComponent.new(view, { template_path: 'posts/components/test'})
      assert_equal "<tao-on-rail-base-component-test-post></tao-on-rail-base-component-test-post>", pc.render
    end

    test "when block given and template exist, it should render the template with block content" do
      pc = PostComponent.new(view, { template_path: "components/post"})
      assert_equal "<tao-on-rail-base-component-test-post>block content</tao-on-rail-base-component-test-post>", pc.render { "block content" }
    end

    test "it should return the correct tag name." do
      assert_equal "tao-on-rail-base-component-test-post", PostComponent.tag_name
      assert_equal "tao-post-article", ::Posts::ArticleComponent.tag_name
    end

    test "it should renturn the correct component_name." do
      assert_equal "on_rail_base_component_test_post", PostComponent.component_name
      assert_equal "post_article", ::Posts::ArticleComponent.component_name
    end

    test "default tag_prefix should be tao" do
      assert_equal :tao, PostComponent.tag_prefix
    end

    test "it should return the correct template_path" do
      assert PostComponent.template_paths.include?('components/tao_on_rails/base_component_test')
      assert PostComponent.template_paths.include?('tao_on_rails/base_component_test/components')
    end

  end
end
