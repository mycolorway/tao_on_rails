module TaoOnRails
  module Components
    class Base

      attr_reader :options, :template_path, :view

      def initialize view, options = {}
        @view = view
        @options = options
        @template_path = @options.delete(:template_path) || self.class.template_path
      end

      def render &block
        if view.lookup_context.exists?(template_path, [], true)
          view.render layout: template_path, locals: {component: self}, &block
        else
          view.content_tag self.class.tag_name, options, &block
        end
      end

      def self.tag_name
        @tag_name ||= "#{self.tag_prefix}-#{self.component_name.to_s.dasherize}"
      end

      def self.component_name
        @component_name ||= self.name.underscore.split('/').map(&:singularize).join('_')
          .gsub(/(.+)_component$/, '\1')
          .gsub(/^#{Regexp.quote(self.tag_prefix.to_s.underscore)}_(.+)/, '\1')
      end

      def self.tag_prefix
        :tao
      end

      def self.template_path
        @template_path ||= "components/#{self.name.underscore}"
      end

    end
  end
end
