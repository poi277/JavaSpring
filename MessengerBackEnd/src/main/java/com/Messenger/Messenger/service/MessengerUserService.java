package com.Messenger.Messenger.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Messenger.Messenger.DTO.MessengerUserLoginDTO;
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

	public void RegisterUserService(MessengerUserLoginDTO dto) {
		if (messengeruserRepository.existsById(dto.getId())) {
			throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
		}
		String encodedPassword = passwordEncoder.encode(dto.getPassword());
		MessengerUser user = new MessengerUser(dto.getId(), encodedPassword);
		messengeruserRepository.save(user);
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
