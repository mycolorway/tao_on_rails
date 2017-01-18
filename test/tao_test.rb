require 'test_helper'

class TaoOnRails::Test < ActiveSupport::TestCase

  test 'version number' do
    assert TaoOnRails::VERSION
  end

  test 'TaoOnRails::Engine inherits from Rails::Engine' do
    assert TaoOnRails::Engine < Rails::Engine
  end

end
