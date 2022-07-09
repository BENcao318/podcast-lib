class Api::V1::SearchesController < ApplicationController
  def create
    render json: {
      podcasts: ItunesApiService.search_podcasts(search_params),
      episodes: ItunesApiService.search_episodes(search_params)
    }
  end

  private
  
  def search_params
    params.require(:search_text)
  end
end
