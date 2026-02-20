INSERT INTO users (id, name, email, password_hash, username, date_of_birth) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Alice', 'alice@example.com', 'hashed_password_1', 'alice', '1990-01-01'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Bob', 'bob@example.com', 'hashed_password_2', 'bob', '1992-02-02'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Charlie', 'charlie@example.com', 'hashed_password_3', 'charlie', '1995-03-03');

INSERT INTO posts (id, author_id, content) VALUES
('post_1', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'This is the first post by Alice!'),
('post_2', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'This is the first post by Bob!'),
('post_3', 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'This is the first post by Charlie!');

INSERT INTO comments (post_id, author_id, content) VALUES
('post_1', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Great post, Alice!'),
('post_1', 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'I agree with Bob.'),
('post_2', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Thanks for sharing, Bob!');

INSERT INTO likes (user_id, post_id) VALUES
('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'post_1'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'post_1'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'post_2');
