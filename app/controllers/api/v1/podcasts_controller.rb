class Api::V1::PodcastsController < ApplicationController
  require 'rest-client'
  require 'nokogiri'

  before_action :set_podcast, only: [:show, :update, :destroy]

  # GET /podcasts
  def index
    @podcasts = Podcast.all
    
    render json: get_podcasts
  end

  # GET /podcasts/1
  def detail
    podcast_detail = JSON.parse(get_podcast_detail(params[:id]).body)
    
    rss_feed_url = podcast_detail["results"][0]["feedUrl"]

    podcast_detail["results"][0]["description"] = get_podcast_description(rss_feed_url)   #Add description crawled from the rss_url and add it into the hash

    render json: podcast_detail
  end

  # POST /podcasts
  def create
    @podcast = Podcast.new(podcast_params)

    if @podcast.save
      render json: @podcast, status: :created, location: @podcast
    else
      render json: @podcast.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /podcasts/1
  def update
    if @podcast.update(podcast_params)
      render json: @podcast
    else
      render json: @podcast.errors, status: :unprocessable_entity
    end
  end

  # DELETE /podcasts/1
  def destroy
    @podcast.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_podcast
      @podcast = Podcast.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def podcast_params
      params.require(:podcast).permit(:title, :body)
    end

    def get_podcasts
      url = "https://itunes.apple.com/search?term=podcast&limit=40"
      response = RestClient.get(url)
    end

    def get_podcast_detail(collection_id)
      url = "https://itunes.apple.com/lookup?id=#{collection_id}&media=podcast&entity=podcastEpisode&limit=400&attribute=descriptionTerm"
      response = RestClient.get(url)
    end

    def get_podcast_description(rss_feed_url)
      podcast_rss_xml = RestClient.get(rss_feed_url)
      parsed_data = Nokogiri::XML(podcast_rss_xml)    #Convert the xml file to parsed data

      description = parsed_data.css("description").map(&:text)[0]   #Find the description tag from XML nodeset and return the content 

      description.gsub(/(<([^>]+)>)/, '')   #Using regex to replace the tags
    end
end
