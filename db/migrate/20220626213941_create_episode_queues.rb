class CreateEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    create_table :episode_queues do |t|
      t.string :episode_name
      t.string :artwork_url_600
      t.string :genres, array:true, default:[]
      t.integer :track_id
      t.integer :track_time_millis
      t.string :episode_url
      t.string :collection_name
      t.string :description

      t.timestamps
    end
  end
end
