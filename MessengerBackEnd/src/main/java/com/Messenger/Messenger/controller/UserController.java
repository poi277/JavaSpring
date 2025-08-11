package com.Messenger.Messenger.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Messenger.Messenger.DTO.MessagePostDTO;
import com.Messenger.Messenger.DTO.MessengerUserLoginDTO;
import com.Messenger.Messenger.DTO.MessengerUserRegisterDTO;
import com.Messenger.Messenger.DTO.UserSessionDTO;
import com.Messenger.Messenger.info.MessagePost;
import com.Messenger.Messenger.info.MessengerUser;
import com.Messenger.Messenger.repository.MessagePostRepository;
import com.Messenger.Messenger.repository.MessengerUserRepository;
import com.Messenger.Messenger.service.MessengerUserService;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

	private final MessengerUserRepository messengeruserRepository;
	private final MessengerUserService messengeruserService;
	private final MessagePostRepository messagePostRepository;

	UserController(MessengerUserRepository messengeruserRepository, MessengerUserService messengeruserService,
			MessagePostRepository messagePostRepository) {
		this.messengeruserRepository = messengeruserRepository;
		this.messengeruserService = messengeruserService;
		this.messagePostRepository = messagePostRepository;
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
			UserSessionDTO userSession = new UserSessionDTO(user.getUuid(), user.getName(), "user");
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


	@GetMapping("/profile")
	public ResponseEntity<?> getCurrentUser(HttpSession session) {
		UserSessionDTO user = (UserSessionDTO) session.getAttribute("user");
		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 필요");
	}


	@PostMapping("/userlogout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate(); // Redis에 저장된 세션도 같이 삭제됨
		return ResponseEntity.ok("로그아웃 성공");
	}

	@PostMapping("/register")
	public ResponseEntity<?> UserRegister(@RequestBody MessengerUserRegisterDTO userRegisterDTO) {
		try {
			messengeruserService.RegisterUserService(userRegisterDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
		}
	}

	@PostMapping("/write")
	public ResponseEntity<String> writePost(@RequestBody MessagePostDTO dto) {
		Optional<MessengerUser> userOpt = messengeruserRepository.findByUuid(dto.getUserUuid());
		if (userOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 정보 없음");
		}
		MessengerUser user = userOpt.get();

		MessagePost post = new MessagePost();
		post.setTitle(dto.getTitle());
		post.setContext(dto.getContext());
		post.setLikeCount(0);
		post.setCreatedDate(LocalDateTime.now());
		post.setMessengerUser(user);

		messagePostRepository.save(post);

		return ResponseEntity.ok(post.getMessengerUser().getUuid()); // 글의 UUID 리턴
	}

	@GetMapping("/allpostlist")
	public List<MessagePostDTO> AllPostList() {
		List<MessagePost> posts = messagePostRepository.findAll();
		return new MessagePostDTO().toDTOList(posts);
	}

	@GetMapping("/userpostlist/{uuid}")
	public List<MessagePostDTO> userPostList(@PathVariable String uuid) {
		List<MessagePost> posts = messagePostRepository.findByMessengerUser_Uuid(uuid);
		return new MessagePostDTO().toDTOList(posts);
	}

	@GetMapping("/post/{postid}")
	public ResponseEntity<?> userPost(@PathVariable Long postid) {
		Optional<MessagePost> post = messagePostRepository.findById(postid);
		if (post.isPresent()) {
			MessagePostDTO dto = new MessagePostDTO().toDTO(post.get());
			return ResponseEntity.ok(dto);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
		}
	}

}