
module TaoOnRails
  module Components
    class Base

      attr_reader :options, :template_path, :block_content, :view

      def initialize options = {}, view = nil, &block
        @view = view
        @options = options
        @block_content = block_given? ? yield : ""
        @template_path = options.delete(:template_path) || self.class.default_template_path
      end

      def render
        if view.lookup_context.exist?(template_path, [], true)
          view.render partial: template_path, locals: { component: self }
        else
          view.content_tag self.class.tag_name, block_content, options
        end
      end

      def self.tag_name
        @tag_name ||= "#{self.tag_prefix}-#{self.component_name.dasherize}"
      end

      def self.component_name
        @component_name ||= self.name.demodulize.underscore.gsub(/(.+)_component$/, '\1')
      end

      protected

      def self.tag_prefix
        :tao
      end

      def self.default_template_path
        @default_template_path ||= "components/#{self.component_name}"
      end

    end
  end
end
