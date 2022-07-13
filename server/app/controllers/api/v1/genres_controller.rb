class Api::V1::GenresController < ApplicationController
  def create
    response = ItunesApiService.get_genre_podcasts(genre_params)
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
end
