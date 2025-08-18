-- Clear all existing test data to keep only recent scores
DELETE FROM test_results;
DELETE FROM test_sessions;

-- Reset the sequences if needed (optional, for clean IDs)
-- Note: UUIDs don't use sequences, so this is just for reference