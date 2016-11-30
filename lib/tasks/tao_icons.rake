namespace :tao do
  namespace :svg_icons do
    desc 'generate svg icons.'
    task :generate => :environment do
      File.open 'vendor/assets/javascripts/tao/icons.coffee', 'w' do |f|
        f.puts %{tao.iconsHtml = '''#{svg_html}'''}
      end
    end

    private

    def svg_html
      %{<svg id="tao-icons" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">\n#{symbols}</svg>}
    end

    def svg_files
      @svg_files ||= Dir.glob(File.expand_path('app/assets/icons/*.svg')).uniq
    end

    def symbols
      svg_files.map {|file| "  #{symbol(file)}\n"}.join
    end

    def symbol(path)
      name = File.basename(path, ".*").underscore().dasherize()
      content = File.read(path)
      content.gsub(/<?.+\?>/,'')
        .gsub(/<!.+?>/,'')
        .gsub(/<title>.*<\/title>/, '')
        .gsub(/<desc>.*<\/desc>/, '')
        .gsub(/id=/,'class=')
        .gsub(/<svg.+?>/, %Q{<svg id="icon-#{name}" #{dimensions(content)}>})
        .gsub(/svg/,'symbol')
        .gsub(/\n/, '') # Remove endlines
        .gsub(/\s{2,}/, ' ') # Remove whitespace
        .gsub(/>\s+</, '><') # Remove whitespace between tags
    end

    def dimensions(content)
      dimension = content.scan(/<svg.+(viewBox=["'](.+?)["'])/).flatten
      viewbox = dimension.first
      #coords = dimension.last.split(' ')

      #width = coords[2].to_i - coords[0].to_i
      #height = coords[3].to_i - coords[1].to_i
      #hack android svg
      width = '100%'
      height = '100%'
      %Q{#{viewbox} width="#{width}" height="#{height}"}
    end
  end

end
