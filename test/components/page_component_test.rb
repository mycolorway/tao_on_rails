require 'test_helper'

module TaoOnRails
  module Components
    class PageComponentTest < ::ActionView::TestCase
      attr_reader :page_component

      setup do
        view.stubs(:page_id).returns("home")
        @page_component = PageComponent.new view
      end

      # #initialize
      test "it should set the @page_id and class correctly" do
        assert_equal 'home', page_component.instance_variable_get(:@page_id)
        assert_equal ['tao-page', 'home-page'], page_component.options[:class]
      end

      # #render
      test "it should render the tag with block content correctly" do
        assert_equal '<home-page class="tao-page home-page">Hello World!</home-page>', page_component.render {'Hello World!'}
      end

      # .component_name
      test "it should return the component_name" do
        assert_equal :page, PageComponent.component_name
      end

    end
  end
end
