namespace :tao do

  desc 'generate svg icons.'
  task :generate_icons => :environment do
    dir_name = "#{Rails.root}/vendor/assets/javascripts/tao"
    Dir.mkdir(dir_name) unless File.exists?(dir_name)

    File.open "#{dir_name}/icons.coffee", 'w' do |f|
      f.puts %{tao.iconsHtml = '''#{svg_html}'''}
    end
  end

  private

  def svg_html
    %{<svg id="tao-icons" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">\n#{symbols}</svg>}
  end

  def svg_files
    @svg_files ||= Dir.glob(File.expand_path("#{::Rails.root}/app/assets/icons/*.svg")).uniq
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
      .gsub(/\sfill=".+?"/,'')
      .gsub(/\n/, '') # Remove endlines
      .gsub(/\s{2,}/, ' ') # Remove whitespace
      .gsub(/>\s+</, '><') # Remove whitespace between tags
  end

  def dimensions(content)
    dimension = content.scan(/<svg.+(viewBox=["'](.+?)["'])/).flatten
    %Q{#{dimension.first} width="100%" height="100%"}
  end

end
