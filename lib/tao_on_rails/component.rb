
module TaoOnRails
  class Component

    attr_reader :options, :template_path, :block_content, :view

    def initialize options = {}, view = nil, &block
      @view = view
      @options = options
      @block_content = block_given? ? yield : ""
      @template_path = options.delete(:template_path) || default_template_path
    end

    def render
      view.render partial: self.template_path, locals: { component: self }
    end

    def tag_name
      @tag_name ||= class_name_without_modules.underscore.tr '_', '-'
    end

    def component_name
      class_name_without_modules.underscore
    end

    private

    def default_template_path
      "components/#{component_name}"
    end

    def class_name_without_modules
      self.class.name.demodulize
    end
  end
end
