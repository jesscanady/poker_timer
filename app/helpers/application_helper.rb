module ApplicationHelper
  def google_font_link_tag(family)
    tag('link', {:rel => :stylesheet, :type => Mime::CSS, :href => "http://fonts.googleapis.com/css?family=#{family}"}, false, false)
  end
end
