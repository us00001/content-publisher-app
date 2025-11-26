user = User.create!(name: 'Demo User', email: 'demo@example.com', password: 'password', password_confirmation: 'password')
user.publications.create!(title: 'Welcome', content: 'This is a published post.', status: 'published', published_at: Time.current)
user.publications.create!(title: 'Draft Post', content: 'This is a draft.', status: 'draft')
puts 'Seeded demo user and publications'
