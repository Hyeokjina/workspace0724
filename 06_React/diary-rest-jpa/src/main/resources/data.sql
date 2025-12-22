-- Emotion 초기 데이터 (중복 시 무시)
MERGE INTO emotion (name, description) KEY(name) VALUES ('happy', '좋았어');
MERGE INTO emotion (name, description) KEY(name) VALUES ('sad', '힘들어..');
MERGE INTO emotion (name, description) KEY(name) VALUES ('normal', '그냥 그래');
MERGE INTO emotion (name, description) KEY(name) VALUES ('fire', '최고!');

