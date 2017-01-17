require 'test_helper'

class <%= name.camelize %>Test < ActiveSupport::TestCase

  test 'version number' do
    assert <%= name.camelize %>::VERSION.is_a? String
  end

  test '<%= name.camelize %>::Engine inherits from Rails::Engine' do
    assert <%= name.camelize %>::Engine < Rails::Engine
  end

end
