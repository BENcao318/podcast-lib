class Api::V1::SearchesController < ApplicationController
  def create
    render json: {
      podcasts: get_podcasts(search_params),
      episodes: get_episodes(search_params)
    }
  end

  private
  
  def search_params
    params.require(:search_text)
  end

  def get_podcasts(search_text)
    url = "https://itunes.apple.com/search?term=#{search_text}&entity=podcast"
    response = RestClient.get(url)
  end

  def get_episodes(search_text)
    url = "https://itunes.apple.com/search?term=#{search_text}&entity=podcastEpisode&limit=8"
    response = RestClient.get(url)
  end
end
