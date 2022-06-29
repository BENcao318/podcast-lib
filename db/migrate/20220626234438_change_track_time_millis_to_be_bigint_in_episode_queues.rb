class ChangeTrackTimeMillisToBeBigintInEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    change_column :episode_queues, :track_time_millis, :bigint
  end
end
