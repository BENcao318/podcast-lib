# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_27_001641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episode_queues", force: :cascade do |t|
    t.string "episode_name"
    t.string "artwork_url_600"
    t.string "genres", default: [], array: true
    t.bigint "track_id"
    t.bigint "track_time_millis"
    t.string "episode_url"
    t.string "collection_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.string "release_date"
    t.index ["user_id"], name: "index_episode_queues_on_user_id"
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "queues", force: :cascade do |t|
    t.string "name"
    t.string "artwork_url_600"
    t.string "genres", default: [], array: true
    t.integer "track_id"
    t.integer "track_time_millisec"
    t.string "episode_url"
    t.string "collection_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_queues_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "artist_name"
    t.string "art_work_url_600"
    t.string "genres", default: [], array: true
    t.string "genre_ids", default: [], array: true
    t.integer "track_id"
    t.integer "user_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
