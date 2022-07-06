class Api::V1::EpisodeQueuesController < ApplicationController
  before_action :is_logged_in?

  def create  #add episode queue
    user_queue = EpisodeQueue.where(episode_name: queue_params[:episode_name], user_id: session[:user_id])
    if user_queue.length == 0
      EpisodeQueue.create!(episode_name: queue_params[:episode_name], description: queue_params[:description], artwork_url_600: queue_params[:artwork_url_600], genres: queue_params[:genres], track_id: queue_params[:track_id], track_time_millis: queue_params[:track_time_millis], episode_url: queue_params[:episode_url], collection_name: queue_params[:collection_name], release_date: queue_params[:release_date], collection_id: queue_params[:collection_id], user_id: session[:user_id])
      render json: {
        success: true,
        message: "A queue is created in the user's database"
      }
    else
      render json: {
        success: false,
        message: "Failed to create queue "
      }
    end

  end

  def destroy #remove episode queue
    episode_to_unqueue = EpisodeQueue.find_by(track_id: unqueue_params[:track_id], episode_name: unqueue_params[:episode_name], user_id: session[:user_id])

    if episode_to_unqueue
      episode_to_unqueue.destroy
      render json: {
        success: true,
        message: 'episode unqueued'
      }
    else
      render json: {
        success: false,
        message: 'did not unqueue episode'
      }
    end
  end

  def index
    queues = EpisodeQueue.where(user_id: session[:user_id])
    render json: queues
  end

  private
  
  def queue_params
    params.require(:episode_to_queue).permit(:episode_name, :description, :artwork_url_600, {genres: [:name, :id]}, :track_id, :track_time_millis, :episode_url, :collection_name, :release_date, :collection_id)
  end

  def unqueue_params
    params.require(:episode_to_unqueue).permit(:track_id, :episode_name)
  end

  def is_logged_in?
    if logged_in? && current_user
      puts 'logged_in'
    else
      render json: {
        status: 401,
        message: 'user not logged_in'
      }
    end
  end
end
