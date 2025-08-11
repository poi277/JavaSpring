package com.Messenger.Messenger.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Messenger.Messenger.DTO.MessengerUserLoginDTO;
import com.Messenger.Messenger.DTO.MessengerUserRegisterDTO;
import com.Messenger.Messenger.info.MessengerUser;
import com.Messenger.Messenger.repository.MessengerUserRepository;

@Service
public class MessengerUserService {
	private final MessengerUserRepository messengeruserRepository;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;

	public MessengerUserService(MessengerUserRepository userRepository) {
		this.messengeruserRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder(); // 또는 @Bean으로 등록해서 주입받기
	}


	public void RegisterUserService(MessengerUserRegisterDTO dto) {
		if (messengeruserRepository.existsById(dto.getId())) {
			throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
		}
		String encodedPassword = passwordEncoder.encode(dto.getPassword());

		int maxRetries = 5;
		for (int i = 0; i < maxRetries; i++) {
			String uuid = UUID.randomUUID().toString();
			MessengerUser user = new MessengerUser(dto.getId(), encodedPassword, dto.getName(), uuid);

			try {
				messengeruserRepository.save(user);
				return; // 저장 성공 시 메서드 종료
			} catch (DataIntegrityViolationException e) {
				// UUID 중복 가능성 있음, 재시도
				if (i == maxRetries - 1) {
					throw new RuntimeException("UUID 중복으로 인한 저장 실패, 최대 재시도 횟수 초과");
				}
				System.out.println("UUID 중복 발생, 재시도 중... 시도 횟수: " + (i + 1));
			}
		}
	}

	public MessengerUser loginService(MessengerUserLoginDTO dto) {
		Optional<MessengerUser> messengerUserOpt = messengeruserRepository.findById(dto.getId());
		if (messengerUserOpt.isEmpty()) {
			throw new IllegalArgumentException("해당 유저의 정보가 없습니다.");
		}
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(dto.getId(), dto.getPassword()));

		// SecurityContext에 인증 정보 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return messengerUserOpt.get();
	}


}
