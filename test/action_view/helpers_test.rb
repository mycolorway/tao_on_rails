require 'test_helper'

class TaoOnRails::ActionView::HelpersTest < ActiveSupport::TestCase
  include TaoOnRails::ActionView::Helpers

  test 'icon_tag helper' do
    tag = icon_tag :edit, :class => 'test-icon', :'test-attr' => 'test'
    assert_equal tag, %Q(<svg class=\"test-icon icon icon-edit\" test-attr=\"test\"><use xlink:href=\"#icon-edit\"/></svg>)
  end

end
