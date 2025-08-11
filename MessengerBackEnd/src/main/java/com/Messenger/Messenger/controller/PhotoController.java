package com.Messenger.Messenger.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Messenger.Messenger.info.MessagePhoto;
import com.Messenger.Messenger.info.MessagePost;
import com.Messenger.Messenger.repository.MessagePhotoRepository;
import com.Messenger.Messenger.repository.MessagePostRepository;

@RestController
public class PhotoController {

	private final MessagePhotoRepository messagePhotoRepository;
	private final MessagePostRepository messagePostRepository;

	// 생성자에 @Autowired 붙여도 되고, 스프링 4.3 이상이면 생략 가능
	public PhotoController(MessagePhotoRepository messagePhotoRepository, MessagePostRepository messagePostRepository) {
		this.messagePhotoRepository = messagePhotoRepository;
		this.messagePostRepository = messagePostRepository;
	}

	@PostMapping("/uploadphoto")
	public ResponseEntity<String> uploadPhoto(@RequestParam("file") MultipartFile file,
			@RequestParam("uuid") String uuid) {
		try {
			String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
			Path uploadPath = Paths.get("uploads");
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			Path filePath = uploadPath.resolve(filename);
			Files.write(filePath, file.getBytes());

			String fileUrl = "http://localhost:5000/uploads/" + filename;

			// 게시글 uuid로 조회 (findByUuid가 있으면 더 명확)
			MessagePost post = messagePostRepository.findFirstByMessengerUser_UuidOrderByCreatedDateDesc(uuid)
					.orElseThrow(() -> new RuntimeException("게시글이 없습니다"));

			MessagePhoto photo = new MessagePhoto();
			photo.setPhotoUrl(fileUrl);
			photo.setMessagePost(post);

			messagePhotoRepository.save(photo);

			return ResponseEntity.ok(fileUrl);

		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
		}
	}
}

