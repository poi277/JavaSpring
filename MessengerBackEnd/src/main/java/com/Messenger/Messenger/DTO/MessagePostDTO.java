package com.Messenger.Messenger.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.Messenger.Messenger.info.MessagePost;

public class MessagePostDTO {
	private long id;
	private String title;
	private String context;
	private LocalDateTime createdDate;
	private int likeCount;
	private String userUuid;
	private String name;
	private List<String> photoUrls; // 사진 URL 리스트

	public MessagePostDTO() {
	}


	public MessagePostDTO(long id, String title, String context, LocalDateTime createdDate, int likeCount,
			String userUuid, String name, List<String> photoUrls) {
		super();
		this.id = id;
		this.title = title;
		this.context = context;
		this.createdDate = createdDate;
		this.likeCount = likeCount;
		this.userUuid = userUuid;
		this.name = name;
		this.photoUrls = photoUrls;
	}
	public MessagePostDTO toDTO(MessagePost post) {
		List<String> photoUrls = post.getPhotos().stream().map(photo -> photo.getPhotoUrl())
				.collect(Collectors.toList());

		return new MessagePostDTO(post.getId(), post.getTitle(), post.getContext(), post.getCreatedDate(),
				post.getLikeCount(), post.getMessengerUser() != null ? post.getMessengerUser().getUuid() : null,
				post.getMessengerUser() != null ? post.getMessengerUser().getName() : null, photoUrls);
	}
	public List<MessagePostDTO> toDTOList(List<MessagePost> posts) {
		return posts.stream().map(this::toDTO).toList();
	}

	// Getter & Setter
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public int getLikeCount() {
		return likeCount;
	}

	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}

	public String getUserUuid() {
		return userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getPhotoUrls() {
		return photoUrls;
	}

	public void setPhotoUrls(List<String> photoUrls) {
		this.photoUrls = photoUrls;
	}

}
