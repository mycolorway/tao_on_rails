class PostsController < ApplicationController
  def show
    @post = posts[params[:id].to_i - 1]
  end

  def index
    @posts = posts
  end

  private

  def posts
    @posts ||= [OpenStruct.new({ title: 'Hello', content: 'You can call me God' }),
                OpenStruct.new({ title: 'Hola', content: 'CarpeDiem' })]
  end
end
