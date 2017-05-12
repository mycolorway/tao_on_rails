require  'test_helper'

module TaoOnRails
  module Components
    class BaseTest < ::ActionView::TestCase

      class PostComponent < Base
      end

      # #initialize
      test "it should set he view, options, and template_path" do
        pc = PostComponent.new(view, { display: 'disable' })
        assert_equal view, pc.view
        assert_equal({ display: 'disable'}, pc.options)
        assert_equal 'components/tao_on_rails/components/base_test/post', pc.template_path
      end

      # #render
      test "when block not given and template not exist, it should render with just the content with content tag" do
        pc = PostComponent.new(view)
        assert_equal "<tao-on-rail-component-base-test-post></tao-on-rail-component-base-test-post>", pc.render
      end

      test "when block given, and template_path not exist, it should render the content with block content in content tag" do
        pc = PostComponent.new(view)
        assert_equal "<tao-on-rail-component-base-test-post>Hello</tao-on-rail-component-base-test-post>", pc.render { "Hello" }
      end

      test "when block not given and template exist, it should render the template" do
        pc = PostComponent.new(view, { template_path: "components/post"})
        assert_equal "<tao-post><h1>hello</h1></tao-post>\n\n", pc.render
      end

      test "when block given and template exist, it should render the template with block content" do
        pc = PostComponent.new(view, { template_path: "components/post"})
        assert_equal "<tao-post><h1>hello</h1></tao-post>\nblock content\n", pc.render { "block content" }
      end

      # .tag_name
      test "it should return the correct tag name." do
        assert_equal "tao-on-rail-component-base-test-post", PostComponent.tag_name
        assert_equal "tao-article", ::ArticleComponent.tag_name
      end

      # .component_name
      test "it should renturn the correct component_name." do
        assert_equal "on_rail_component_base_test_post", PostComponent.component_name
        assert_equal "article", ::ArticleComponent.component_name
      end

      # .tag_prefix
      test "default tag_prefix should be tao" do
        assert_equal :tao, PostComponent.tag_prefix
      end

      # .template_path
      test "it should return the correct template_path" do
        assert_equal "components/tao_on_rails/components/base_test/post", PostComponent.template_path
        assert_equal "components/article", ::ArticleComponent.template_path
      end

    end
  end
end
