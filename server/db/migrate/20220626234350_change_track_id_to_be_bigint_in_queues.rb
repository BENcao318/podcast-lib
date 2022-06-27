class ChangeTrackIdToBeBigintInQueues < ActiveRecord::Migration[6.1]
  def change
    change_column :episode_queues, :track_id, :bigint
  end
end
