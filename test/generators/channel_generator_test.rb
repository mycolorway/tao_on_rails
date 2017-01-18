require 'test_helper'
require 'generators/tao/channel/channel_generator'

class Tao::Generators::ChannelGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ChannelGenerator

  test 'generate channel files' do
    assert_no_file 'app/assets/javascripts/channels/little_chat.coffee'
    assert_no_file 'app/channels/little_chat_channel.rb'
    run_generator %w(little_chat speak)
    assert_file 'app/assets/javascripts/channels/little_chat.coffee' do |content|
      assert_match(/app.littleChatChannel = app.cable.subscriptions.create "LittleChatChannel",/, content)
      assert_match(/speak: ->/, content)
    end
    assert_file 'app/channels/little_chat_channel.rb' do |content|
      assert_match(/class LittleChatChannel < ApplicationCable::Channel/, content)
    end
  end

end
