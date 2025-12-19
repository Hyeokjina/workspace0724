-- Emotion 초기 데이터 (중복 시 무시)
MERGE INTO emotion (name, description) KEY(name) VALUES ('happy', '행복');
MERGE INTO emotion (name, description) KEY(name) VALUES ('sad', '슬픔');
MERGE INTO emotion (name, description) KEY(name) VALUES ('angry', '화남');
MERGE INTO emotion (name, description) KEY(name) VALUES ('excited', '신남');
MERGE INTO emotion (name, description) KEY(name) VALUES ('calm', '차분함');
