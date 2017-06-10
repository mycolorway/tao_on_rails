module Posts
  class ArticleComponent < TaoOnRails::Components::Base

    attr_reader :post

    def initialize view, options
      super view, options
      @post = @options.delete(:post)
    end
  end
end
