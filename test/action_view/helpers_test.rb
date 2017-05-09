require 'test_helper'

module TaoOnRails
  module ActionView
    class HelpersTest < ::ActionView::TestCase

      # #page_id
      test "when @page_id set, page_id should be set to @page_id" do
        view.instance_variable_set(:@page_id, 'home')
        assert_equal 'home', view.page_id
      end

      test "when @page_id not set, it should set page_id by controller_name and action_name" do
        view.stubs(:controller_path).returns("authors")
        view.stubs(:action_name).returns("show")
        assert_equal 'authors-show', view.page_id
      end

      # .define_component_helpers
      test "it should define the helper method for awesome components" do
        assert view.respond_to?(:tao_article)
        assert view.respond_to?(:tao_author)
      end

    end
  end
end
