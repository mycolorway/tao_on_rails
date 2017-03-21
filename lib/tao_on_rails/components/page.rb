require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class Page < Base

      def initialize options = {}, view = nil, &block
        super

        if @options[:class].present?
          @options[:class] += " tao-page #{tag_name}"
        else
          @options[:class] = "tao-page #{tag_name}"
        end
      end

      def tag_name
        @tag_name ||= "#{tag_prefix}-#{view.page_id}"
      end

    end
  end
end
