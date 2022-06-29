class DropQueuesTableFromEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    drop_table :queues
  end
end
