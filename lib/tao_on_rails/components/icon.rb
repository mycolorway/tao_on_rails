require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class Icon < Base

      attr_reader :name

      def initialize options = {}, view = nil, &block
        super

        @name = @options.delete(:name)

        if @options[:class].present?
          @options[:class] += " icon icon-#{name}"
        else
          @options[:class] = "icon icon-#{name}"
        end
      end

      def render
        content_tag(:svg, %Q(<use xlink:href="#icon-#{name}"/>), options)
      end

    end
  end
end
