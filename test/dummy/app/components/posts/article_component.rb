module Posts
  class ArticleComponent < TaoOnRails::BaseComponent

    attr_reader :post

    def initialize view, options
      super view, options
      @post = @options.delete(:post)
    end
  end
end
