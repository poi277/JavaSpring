package com.Messenger.Messenger.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class MessengerSessionService {

	// UUID → 마지막 활동 시각(밀리초)
	private final Map<String, Long> lastActiveMap = new ConcurrentHashMap<>();

	// 로그인 시 최초 등록
	public void login(String uuid) {
		lastActiveMap.put(uuid, System.currentTimeMillis());
	}

	// 로그아웃 시 제거
	public void logout(String uuid) {
		lastActiveMap.remove(uuid);
	}

	// Heartbeat 갱신
	public void heartbeat(String uuid) {
		System.out.println("beat");
		lastActiveMap.put(uuid, System.currentTimeMillis());
	}

	// 온라인 여부 확인 (10초 기준)
	public boolean isOnline(String uuid) {
		return System.currentTimeMillis() - lastActiveMap.getOrDefault(uuid, 0L) < 10000;
	}
}

