class Api::V1::GenresController < ApplicationController
  def create
    response = get_podcasts(genre_params)
    if response 
      render json: {
        success: true,
        podcasts: response
      }
    else
      render json: {
        success: false,
        message: 'retrieve failed'
      }
    end
  end

  private

  def genre_params
    params.require(:id)
  end

  def get_podcasts(genre_id)
    url = "https://itunes.apple.com/search?term=podcast&genreId=#{genre_id}&limit=40"
    response = RestClient.get(url)
  end
end
