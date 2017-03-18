require 'test_helper'

class TaoOnRails::ActionView::HelpersTest < ActiveSupport::TestCase
  include TaoOnRails::ActionView::Helpers

  test 'icon_tag helper' do
    tag = icon_tag :edit, :class => 'test-icon', :'test-attr' => 'test'
    assert_equal tag, '<svg class="test-icon icon icon-edit" test-attr="test"><use xlink:href="#icon-edit"/></svg>'
  end

  test 'tao_page helper' do
    html = tao_page 'test-page', class: 'home-page', layout: 'default', json: {x: 1}.to_json.html_safe do
      '<header>Page Title</header>'.html_safe
    end
    assert_equal html, '<test-page class="home-page tao-page test-page" layout="default" json="{&quot;x&quot;:1}"><header>Page Title</header></test-page>'
  end

end
