package com.Messenger.Messenger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Messenger.Messenger.DTO.MessengerUserLoginDTO;
import com.Messenger.Messenger.DTO.UserSessionDTO;
import com.Messenger.Messenger.info.MessengerUser;
import com.Messenger.Messenger.repository.MessengerUserRepository;
import com.Messenger.Messenger.service.MessengerUserService;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

	private final MessengerUserRepository messengeruserRepository;
	private final MessengerUserService messengeruserService;

	UserController(MessengerUserRepository messengeruserRepository, MessengerUserService messengeruserService) {
		this.messengeruserRepository = messengeruserRepository;
		this.messengeruserService = messengeruserService;
	}

	@GetMapping("/")
	public String hello() {
		return "hello";
	}

	// Controller
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MessengerUserLoginDTO dto, HttpSession session) {
		try {
			MessengerUser user = messengeruserService.loginService(dto);
			// SecurityContext 저장
			SecurityContext securityContext = SecurityContextHolder.getContext();
			session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
			UserSessionDTO userSession = new UserSessionDTO(user.getId(), "user");
			session.setAttribute("user", userSession);
			return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 올바르지 않습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
		}
	}


	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(HttpSession session) {
		UserSessionDTO user = (UserSessionDTO) session.getAttribute("user");
		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
	}


	@PostMapping("/userlogout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate(); // Redis에 저장된 세션도 같이 삭제됨
		return ResponseEntity.ok("로그아웃 성공");
	}




	@PostMapping("/register")
	public ResponseEntity<?> UserRegister(@RequestBody MessengerUserLoginDTO userLoginDTO) {
		try {
			messengeruserService.RegisterUserService(userLoginDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
		}
	}

}
