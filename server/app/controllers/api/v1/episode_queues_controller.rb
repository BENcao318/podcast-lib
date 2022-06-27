class Api::V1::EpisodeQueuesController < ApplicationController
  before_action :is_logged_in?

  def create  #add episode queue
    user_queue = EpisodeQueue.where(episode_name: params[:episode_to_queue][:episode_name], user_id: session[:user_id])
    puts 'user_queue!!'
    puts user_queue
    if user_queue.length == 0
      EpisodeQueue.create!(episode_name: params[:episode_to_queue][:episode_name], description: params[:episode_to_queue][:description], artwork_url_600: params[:episode_to_queue][:artwork_url_600], genres: params[:episode_to_queue][:genres], track_id: params[:episode_to_queue][:track_id], track_time_millis: params[:episode_to_queue][:track_time_millis], episode_url: params[:episode_to_queue][:episode_url], collection_name: params[:episode_to_queue][:collection_name], user_id: session[:user_id], release_date: params[:episode_to_queue][:release_date])
    end
  end

  def destroy #remove episode queue
    episode_to_unqueue = EpisodeQueue.find_by(track_id: params[:episode_to_unqueue][:track_id], episode_name: params[:episode_to_unqueue][:episode_name], user_id: session[:user_id])
    episode_to_unqueue.destroy
    render json: {
      message: 'episode unqueued'
    }
  end

  def index
    queues = EpisodeQueue.where(user_id: session[:user_id])
    render json: queues
  end

  private
  
  def queue_params
    params.require(:episode_to_queue)
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
