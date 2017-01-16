require 'test_helper'

class TaoOnRailsTest < ActiveSupport::TestCase

  test 'version number' do
    assert TaoOnRails::VERSION.is_a? String
  end

  test 'TaoOnRails::Engine inherits from Rails::Engine' do
    assert TaoOnRails::Engine < Rails::Engine
  end

end
