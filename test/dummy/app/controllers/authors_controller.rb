class AuthorsController < ApplicationController
  def show
    @author = OpenStruct.new({name: 'Jesus'})
  end
end

