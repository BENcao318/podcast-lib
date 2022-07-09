require 'rest-client'
require 'nokogiri'

class ItunesApiService

  def self.get_podcasts
    url = "https://itunes.apple.com/search?term=podcast&limit=180"
    response = RestClient.get(url)
  end

  def self.get_podcast_detail(collection_id)
    url = "https://itunes.apple.com/lookup?id=#{collection_id}&media=podcast&entity=podcastEpisode&limit=400&attribute=descriptionTerm"
    response = RestClient.get(url)
    podcast_detail = JSON.parse(response.body) 
    rss_feed_url = podcast_detail["results"][0]["feedUrl"]

    podcast_rss_xml = RestClient.get(rss_feed_url)
    parsed_data = Nokogiri::XML(podcast_rss_xml)    #Convert the xml file to parsed data
    description = parsed_data.css("description").map(&:text)[0]   #Find the description tag from XML nodeset and return the content 
    podcast_detail["results"][0]["description"] = description.gsub(/(<([^>]+)>)/, '')   #Using regex to replace the tags

    podcast_detail
  end

  def self.get_genre_podcasts(genre_id)
    url = "https://itunes.apple.com/search?term=podcast&genreId=#{genre_id}&limit=40"
    response = RestClient.get(url)
  end

  def self.search_podcasts(search_text)
    url = "https://itunes.apple.com/search?term=#{search_text}&entity=podcast"
    response = RestClient.get(url)
  end

  def self.search_episodes(search_text)
    url = "https://itunes.apple.com/search?term=#{search_text}&entity=podcastEpisode&limit=8"
    response = RestClient.get(url)
  end
end