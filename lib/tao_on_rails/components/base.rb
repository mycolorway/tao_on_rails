
module TaoOnRails
  module Components
    class Base

      attr_reader :options, :template_path, :view

      def initialize options = {}, view = nil
        @view = view
        @options = options
        @template_path = options.delete(:template_path) || self.class.default_template_path
      end

      def render &block
        if view.lookup_context.exist?(template_path, [], true)
          view.render layout: template_path, locals: { component: self }, &block
        else
          view.content_tag self.class.tag_name, options, &block
        end
      end

      def self.tag_name tag_name = nil
        @tag_name = tag_name if tag_name
        @tag_name ||= "#{self.tag_prefix}-#{self.component_name.to_s.dasherize}"
      end

      def self.component_name component_name = nil
        @component_name = component_name if component_name
        @component_name ||= self.name.underscore.split('/').map(&:singularize).join('_')
          .gsub(/(.+)_component$/, '\1')
          .gsub(/^#{Regexp.quote(self.tag_prefix.to_s.underscore)}_(.+)/, '\1')
      end

      protected

      def self.tag_prefix prefix = nil
        @tag_prefix = prefix if prefix
        @tag_prefix ||= 'tao'
      end

      def self.default_template_path path = nil
        @default_template_path = path if path
        @default_template_path ||= "components/#{self.name.underscore}"
      end

    end
  end
end
