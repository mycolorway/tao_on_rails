require 'test_helper'

class TaoOnRails::Test < ActiveSupport::TestCase

  test 'version number' do
    assert TaoOnRails.version
  end

  test 'TaoOnRails::Engine inherits from Rails::Engine' do
    assert TaoOnRails::Engine < Rails::Engine
  end

end
