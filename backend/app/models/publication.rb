class Publication < ApplicationRecord
  belongs_to :user

  enum status: { draft: 0, published: 1, archived: 2 }

  validates :title, presence: true, length: { maximum: 250 }
  validates :content, presence: true

  scope :search_title, ->(q) { where('LOWER(title) LIKE ?', "%\#{q.downcase}%") if q.present? }
  scope :filter_status, ->(s) { where(status: s) if s.present? }
end
